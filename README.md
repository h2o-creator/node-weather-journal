# node-weather-journal
![Build Results](https://app.travis-ci.com/h2o-creator/node-weather-journal.svg?branch=main "Build Results")

A weather journal application project for Udacity

Notice: API credentials included in this repository may not be used in production.

## Architecture
- public_html
    - css
        - style.css (landing page styling)
    - js
        - app.js (client-side javascript code)
    - index.html (landing page for visitors, includes all client-side code and the stylesheet)
- .gitignore (uses the Node gitignore default template from GitHub)
- .travis.yml (Config file for Travis CI - auto build and run tests)
- LICENSE (GNU GPL v3)
- package.json (Details for the NPM package)
- README.md (this file, includes some details about the project)
- server.js (server-side javascript code, uses the Node runtime)

## Dependencies
- Node JavaScript runtime environment
- Express Web API Module (to run the app)
- Body Parser Middleware (for POST)
- CORS Module (for headers)
- Mocha (test framework)
- Chai (for it's expect function, used in combination with Mocha)

## Features
- A functional web application that listens on IP:Port
- Responsive layout and a nice CSS stylesheet
- To be added

## Installation
1. Clone the repo to a local dir
2. Install the package and its dependencies:
```sh
npm-install #in the project dir
```
3. Run the script(s):
```sh
npm run start #run server.js
npm run test #run tests with Mocha and Chai
```
You can also use `node server.js` in the package dir to start the Express web server.

## Known Bugs
- To be added

## Notes
```js
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
```

# Image Copyright

- img/sun-icon.png
    - Source: https://snipstock.com/image/transparent-images-snipstock-com-sun-png-transparent-image-2-png-59686
    - Purpose: Decoration
- img/cloud-icon.png
    - Source: https://mendijonas.blogspot.com/2020/11/cartoon-clouds-clipart-transparent.html
    - Purpose: Decoration
