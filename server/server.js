import http from "http";
import { app } from "./api.js";

const server = http.createServer(app).listen(3000);

