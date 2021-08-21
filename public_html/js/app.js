/*
 *     AUTHOR: 
 *     -   Abdelhady 'H2O' Salah
 * 
 *     VERSION:
 *     -   1.0.0
 * 
 *     REPOSITORY:
 *     -   https://github.com/h2o-creator/node-weather-journal
 * 
 *     LICENSE NOTICE:
 *     -   This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; 
 *         either version 3 of the License, or (at your option) any later version.
 * 
 *     -   This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 *         without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 *     -   You should have received a copy of the GNU General Public License along with this program. If not, see https://www.gnu.org/licenses/.
 */

//Web API Key (shouldn't this be more of a secret rather than being exposed to the browser??)
const weatherAppAPI = '652e8cccc30ae115bc6272635d1ad7ca';
//Anyone with a skill level of a newbie can find this API key, send millions of requests. RIP account.

/*
 * PROCEDURE:
 * 1. User clicked the generate button
 * 2. User input is passed to the APP endpoint (function: updateAPIContent)
 * 3. Continue getting API data from external source (function: getWeatherByZIP)
 * 4. We're adding all the collected data to the endpoint on the server (function: pushProjectData, happened on previous steps, not only once)
 * 5. We're retrieving the data later (function: fetchProjectData)
 * 6. We're updating the UI using the retrieved data (function: UpdateUI)
 */

//Push data to application endpoint (/push-project-data) [NOTE: URL MANUALLY SPECIFIED]
const pushProjectData = async (url = '', data = {}) => { //Async function for POSTing data
    try {
        const response = await fetch(url, { //First, we create the POST request and wait for the response
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json' //Set the content type header to JSON (I think this was part of the MIME specification?)
            },
            body: JSON.stringify(data) //As we set the content type to JSON, we need to send data in JSON!
        });
        return await response.json(); //Wait for the response to come from the server and convert it into JSON.
    } catch (error) { //Something wasn't 'try'able?
        return console.log(error); //Let us know what we couldn't try (Catch the error, print it into the client's console)
    }
};

//Fetch data from application endpoint (/fetch-project-data) [NOTE: URL MANUALLY SPECIFIED]
const fetchProjectData = async (url = '') => { //Create an async function to get the project data
    try {
        const response = await fetch(url, { //This time we're GETting the data not POSTing it
            method: 'GET',
            credentials: 'same-origin', //We're part of the same process ;)
            headers: {
                'Content-Type': 'application/json' //Always JSON!
            }
        });
        return await response.json(); //Return our data as we requested, in JSON format, as the Content-Type header.
    } catch (error) { //Catch any errors, send it into the console (Wouldn't returning the console.log method be undefined anyway?)
        return console.log(error);
    }
};

//This function is the last thing we use. Dynamically update UI after the data is ready to display.
const updateUI = () => {
    fetchProjectData('/fetch-project-data')
    .then ((newData) => {
        //Update country code
        const countryCodeElement = document.querySelector('#country');
        countryCodeElement.textContent = `Country Code: ${newData.countryCode.toUpperCase()}`;
        //Update city
        const cityElement = document.querySelector('#city');
        cityElement.textContent = `City: ${newData.city}`;
        //Update date
        const dateElement = document.querySelector('#date');
        dateElement.textContent = `Today's date: ${newData.date}`;
        //Update temp
        const tempElement = document.querySelector('#temp');
        tempElement.textContent = `Temp: ${newData.temp} ℃`;
        //Update feelings (according to the rubric, wasn't necessary though)
        const contentElement = document.querySelector('#content');
        contentElement.textContent = `Your feelings: ${newData.content}`;
        //Unhide our output section
        const outputElement = document.querySelector('#section-output');
        outputElement.style.display = 'block';
        //Scroll down a bit to the output entry holder...
        const entryHolder = document.querySelector('#entryHolder');
        const outputOffset = entryHolder.offsetTop;
        window.scrollTo(0, outputOffset);
    });
}

//Get Weather Data from OpenWeatherMap by ZIP code
const getWeatherByZIP = (countryCode, zipCode) => {
    //Generate URL based on global (bad) API value + the above parameters
    const weatherRequestURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&units=metric&appid=${weatherAppAPI}`;
    fetch(weatherRequestURL) //Get API data
    .then ((response) => { //This takes the return value of the fetch (it returns a promise AFAIK?)
        if (response.ok === false) { //If the response wasn't OK, do:
            throw new Error('Failed to fetch weather data'); //Throw this error
        }
        return response.json(); //Otherwise, return the response (data) in JSON format
    })
    .then ((data) => { //After returning data into JSON format, data becomes the return value
        const timeStampToMS = data.dt * 1000; //Convert timestamp into milliseconds for JavaScript
        const date = new Date(timeStampToMS).toLocaleDateString('en-US'); //Conver the MS timestamp into the en-US locale
        const cityName = data.name !== undefined ? data.name : 'NA'; //If the name doesn't exist, set it to NA
        const tempCity = data.main.temp !== undefined ? data.main.temp : 'NA'; //Similar... but for temperature
        pushProjectData('/push-project-data', {city: cityName, temp: tempCity, date: date}); //Push the retrieved data from the API into our APP ENDPOINT
    })
    .then (() => { //Then, ignore return values and create an arrow function to update UI after successfully getting all the needed data.
        updateUI();
    })
    .catch ((error) => { //If anything went wrong, let the user know.
        alert('Failed to retrieve weather data.');
        console.log(error);
    });
};

const updateAPIContent = () => {
    //Get data from the fields and let the user know if they missed something
    const countryCodeElement = document.querySelector('#country-code');
    if (countryCodeElement.value === null || countryCodeElement.value === undefined || countryCodeElement.value === "") {
        return alert('Please enter a valid country code.');
    }
    const zipCodeElement = document.querySelector('#zip');
    if (zipCodeElement.value === null || zipCodeElement.value === undefined || zipCodeElement.value === "") {
        return alert('Please enter a valid ZIP code.');
    }
    const feelingsElement = document.querySelector('#feelings');
    if (feelingsElement.value === null || feelingsElement.value === undefined || zipCodeElement.value === "") {
        return alert('Please express your feelings first.');
    }
    //The above checks are pretty basic and could be improved
    //Next we're pushing the data supplied by the client to our application endpoint
    pushProjectData('/push-project-data', {countryCode: countryCodeElement.value, content: feelingsElement.value})
    .then (() => getWeatherByZIP(countryCodeElement.value, zipCodeElement.value)) //If first push was successful, fetch weather data
    .catch ((error) => console.log(error)); //Otherwise...
}

//Initialize
const main = () => {
    const generateButtonElement = document.querySelector('#generate'); //Find the button to view results
    generateButtonElement.addEventListener('click', updateAPIContent); //Trigger an event on clicking the button
};

window.onload = main(); //When the browser (or assuming document?) loads, call the initial function.