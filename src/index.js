const express = require('express')
const app = express()

const PORT = 5555
const URL = `http://localhost:${PORT}`
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

        fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        })
        .then(response => response.json())
        .then(response => console.log(response))

      }
    </script>
  </body>
</html>


`

app.get('/', (req, res) => {
  res.send(frontendTemplate)
})

app.post('/link', (req, res) => {
    res.json({
        "foo": "bar"
    })
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})