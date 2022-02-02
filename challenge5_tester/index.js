import { createReadStream as r, readFileSync as r2 } from "fs";
import { Agent } from "https";

import a from "axios";
import FormData from "form-data";

const form = new FormData();
form.append("key", r("./id_rsa2"));
form.append("secret", r("./secret2"));

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

const path = "http://localhost:8080/";
const hh = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
};
a.post(path, form, { headers: { ...form.getHeaders(), ...hh }, httpsAgent })
  .then(({ data }) => {
    const result_ = data.trim().replace("\n", "").replace("\r", "");
    console.log(`URL:|${path}|`);
    console.log(`РЕЗУЛЬТАТ:|${result_}|`); // matrix
  })
  .catch((e) => console.log(e));
