import http from "http";
import { app } from "./api.js";

const port = 3000;

const server = http.createServer(app).listen(3000);
console.log('server is running');

