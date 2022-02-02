export default function appScr(express, bodyParser, fs, crypto, http, User, m) {
  const app = express();
  const hu = { "Content-Type": "text/html; charset=utf-8" };
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
  };
  let headers = {
    "Content-Type": "text/plain",
    ...CORS,
  };
  return app
    .use(bodyParser.urlencoded({ extended: true }))
    .get("/login/", (req, res) => {
      res.set(headers);
      res.send("vandeer");
    })
    .get("/code/", (req, res) => {
      res.set(headers);
      fs.readFile(import.meta.url.substring(7), (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    })
    .get("/sha1/:input/", (req, res) => {
      res.set(headers);
      let shasum = crypto.createHash("sha1");
      res.send(shasum.update(req.params.input).digest("hex"));
    })
    .get("/req/", (req, res) => {
      res.set(headers);
      let data = "";
      http.get(req.query.addr, async function (response) {
        await response
          .on("data", function (chunk) {
            data += chunk;
          })
          .on("end", () => {});
        res.send(data);
      });
    })
    .post("/req/", (req, res) => {
      res.set(headers);
      let data = "";
      http.get(req.body.addr, async function (response) {
        await response
          .on("data", function (chunk) {
            data += chunk;
          })
          .on("end", () => {});
        res.send(data);
      });
    })
    .post("/insert/", async (r) => {
      r.res.set(headers);
      const { login, password, URL } = r.body;
      const newUser = new User({ login, password });
      try {
        await m.connect(URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        try {
          await newUser.save();
          r.res.status(201).json({ "Добавлено: ": login });
        } catch (e) {
          r.res.status(400).json({ "Ошибка: ": "Нет пароля" });
        }
      } catch (e) {
        console.log(e.codeName);
      }
    })
    .use(({ res: r }) => r.status(404).set(hu).send("vandeer"));
}
