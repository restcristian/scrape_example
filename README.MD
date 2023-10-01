# Scrape Example

> Disclaimer: this script is meant to be used for <b>recreational</b> / <b>educational</b> purposes <b>ONLY</b>. Any further use is up to whoever else uses this.

This script consist a frontend with a button that connects to a NodeJS server that goes to another website in order to get the proper URL sent back to the client.

### How to use

- Clone this repository.
- install dependencies with `yarn`
- Run `yarn dev` to start the server


### How Does it work

On the NodeJS side, we have a `POST` endpoint called `/link` where we open a brand new headless browser session using `Puppeteer` that navigates to a website, waits for its url to change, and then send it back as a JSON response back to the frontend.

On the client side, we redirect the user to this new url.

### Technologies used
- [NodeJS] (https://nodejs.org/en) 
- [ExpressJS](https://expressjs.com/)
- [Puppeteer](https://pptr.dev/)
- [Yarn](https://yarnpkg.com/)


