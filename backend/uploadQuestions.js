import axios from "axios";
import fs from "fs";

const payload = JSON.parse(
  fs.readFileSync("./data/bulk-upload-payload.json", "utf8")
);

axios
  .post("http://localhost:5000/api/admin/questions/bulk-upload", payload)
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err.response?.data || err.message));