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

//Dependencies
//Include all the required modules for the application
const express = require('express'); //Express Web App API
const bodyParser = require('body-parser'); //Middleware to handle POST requests and parse the request body coming from the client
const cors = require('cors'); //Cross-origin resource sharing (something for the HTTP headers)

//API endpoint object
const projectData = {};

//Server options
const serverOptions = {
    hostname: 'localhost',
    port: 7128,
    weatherAppAPI: '652e8cccc30ae115bc6272635d1ad7ca'
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
    console.log('\n***************************************************');
    console.log(`Running Web Journal App using Node & Express:`);
    console.log(serverOptions);
    console.log('***************************************************\n');
});

//Return Data Endpoint
app.get('/fetch-project-data', (req, res) => {
    res.send(projectData);
});