import express from "express"
import router from "./routes/router.js";
import initDatabase from "./dbInit.js";

const app = express();
const port = 8080;

await initDatabase();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);
app.use(express.static("public"));

app.listen(port, () => console.log("Server is running on port " + port));