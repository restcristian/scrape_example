const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

const PORT = 5555;
const URL = `http://localhost:${PORT}`;
// We could get this URL from the client as well.
// const OFFER_URL = "https://goodbed.com/!/beyd4";
const OFFER_URL = "https://goodbed.com/!/bftk4";


const frontendTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Colchon Template</title>
  </head>
  <body>
    <button type="button" onclick="generate()">Generate Referal Link</button>
    <script>
      function generate() {
        const url = "${URL}/link";
        const button = document.querySelector("button")
        button.innerText = "Loading"
        fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          button.innerText = "Completed"
          // window.location.href = response.currentUrl 
        })
      }
    </script>
  </body>
</html>


`;

app.get("/", (_, res) => {
  res.send(frontendTemplate);
});

app.post("/link", async (_, res) => {
  // Launch the browser and open a new blank page with no session
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Navigate the page to a URL
  await page.setExtraHTTPHeaders({
    // 'Cookie': 'brwsr=ec1c7913-2fbc-11ee-9479-d1d54e80128e; irld=LQ48U7x0dP1Wzxu4Uqd09ZRL036pVCcz7s1uezwbTkS2ZAWS2'
    //TODO: Maybe we should get this from the client itself?
    'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  })
  await page.goto(OFFER_URL);
  // Wait for Searly to parse the URL
  await page.waitForNavigation()
  const currentUrl = page.url()
  // Close the session
  await browser.close();
  // Return parsed URL
  await res.json({
    currentUrl
  });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
