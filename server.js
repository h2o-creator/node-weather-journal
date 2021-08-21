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

//PROBLEMS
//I read the Udacity rubric, so I followed the specifications but there's more to do I think.
//1. Secure user input against possible code-breaking methods
//2. Ensure that the user is not abusing the API (can we hide the API behind the server, instead of passing it to the client?)
//3. Allow our project endpoint to work for multiple-users. I mean, isn't it one object for ALL or is it per client? I assume it's global
//      And that would conflict with many requests I think?

//Dependencies
//Include all the required modules for the application
const express = require('express'); //Express Web App API
const bodyParser = require('body-parser'); //Middleware to handle POST requests and parse the request body coming from the client
const cors = require('cors'); //Cross-origin resource sharing (something for the HTTP headers)

//API endpoint object
let projectData = {};

//Server options
const serverOptions = {
    hostname: 'localhost',
    port: 7128
};

//Initialize
const app = express(); //Create an application instance using express

//Use the dependencies (middleware & cors)
app.use(bodyParser.urlencoded({ extended: false })); //Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //Parse application/json
app.use(cors());

//Include browser files (the actual content)
app.use(express.static('public_html'));

//Start the server
const server = app.listen(serverOptions.port, serverOptions.hostname, () => {
    //Running the server on the options added above at Server Options
    console.log('\n***************************************************');
    console.log(`Running Web Journal App using Node & Express:`);
    console.log(serverOptions);
    console.log('***************************************************\n');
});

//Return Data Endpoint
app.get('/fetch-project-data', (_req, res) => {
    //Respond with the object endpoint
    res.send(projectData);
});

//Push Data to Endpoint
app.post('/push-project-data', (req, res) => {
    //Suggest a better way we can do this... I think there should be a way to guess the object key... dynamically.
    //Here we're basically updating the project endpoint with whatever request came from the client.
    projectData.date = req.body.date !== undefined ? req.body.date : projectData.date;
    projectData.temp = req.body.temp !== undefined ? req.body.temp : projectData.temp;
    projectData.content = req.body.content !== undefined ? req.body.content : projectData.content;
    projectData.countryCode = req.body.countryCode !== undefined ? req.body.countryCode : projectData.countryCode;
    projectData.city = req.body.city !== undefined ? req.body.city : projectData.city;
    //Respond with the new project data object
    res.send(projectData);
});