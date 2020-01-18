# Node JS Theme Development Environment

![Generic badge](https://img.shields.io/badge/status-beta-blue.svg)

a Node JS based Environment structured to build/generate static HTML pages and CSS.
The goal is to make a dynamic theme environment.

### Tech

This environment uses a number of open source projects to make the enivornment work dynamicly:
* [node JS] - the run-time environment, used along many other Node JS based frameworks.
* [Node JS Express] - Node JS network app framework.
* [handlebarsJS] - Used to template the theme HTML pages.
* [i18n-node] - Translation module.
* [browser-refresh] - to auto refresh active pages when there's a change, use command browser-refresh server.js


The initial theme is based on the following framework:
* [Bootstrap] - Used as a source code, Bootstrap options are ready to be customized.
* [Font Awesome] - The popular Icons font.


To generate assets and static HTML page, the following framework is used:
* [Webpack] - Build SCSS files into CSS, collect JSes files into one.
* [puppeteer] - Generates Static HTML pages outta Semantic pages, might not be necessary.


### Todos
 - Use Bootstrap HTML structure to make masterpage and homepage.


#### License
MIT