import express from "express"
import router from "./routes/router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(port, () => console.log("Server is running on port " + port));