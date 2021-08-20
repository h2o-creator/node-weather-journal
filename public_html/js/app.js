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

//Fetch data from application endpoint (/fetch-project-data)
const fetchProjectData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    try {
        const projectData = response.json();
        return projectData;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}