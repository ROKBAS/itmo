const [{ Server: h1 }, x] = [require("http"), require("express")];
const { privateDecrypt: dec } = require("crypto");
const Busboy = require("busboy");

const Router = x.Router();
const PORT = process.env.PORT || 10001;
const hu = { "Content-Type": "text/html; charset=utf-8" };

const app = x();
Router.route("/")
  .get((r) => r.res.end("Привет мир!"))
  .post((req, res) => {
    let o = {};
    const boy = new Busboy({ headers: req.headers });
    boy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      file.on("data", function (data) {
        o[fieldname] = data;
      });
    });
    boy.on("finish", function () {
      let result = dec(o.key, o.secret);
      res.send(result.toString("utf-8"));
    });
    req.pipe(boy);
  });
Router.route("/login").get((r) => r.res.end("Антон Фомин"));

app.use((r, rs, n) => rs.status(200).set(hu) && n()).use("/", Router);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
