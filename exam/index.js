const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(typeof req);
  res.send("Hello World!");
});
// app.get("/f", (r) =>
//   r.res.format({
//     "text/html": () => r.res.send(`<h2>Результат 42</h2>`),
//     "application/json": () => r.res.json({ "Результат:": 42 }),
//   })
// );
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
