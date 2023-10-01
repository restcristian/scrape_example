const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

const PORT = 5555;
const URL = `http://localhost:${PORT}`;
// We could get this URL from the client as well.
const SEARLY_URL = "https://goodbed.com/!/bftk4";

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
          window.location.href = response.currentUrl 
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
  await page.goto(SEARLY_URL);
  // Wait for Searly to parse the URL
  await new Promise(r => setTimeout(r, 5000))
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
