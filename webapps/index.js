const express = require('express');
const app = express();
const port = parseInt(process.argv[2])

if (typeof port !== "number") {
    console.log("couldn't find the port")
    process.exit();
}

app.get('/', (req, res) => {
  res.send({
      message: `Hello, I'm running on port ${port}`
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})