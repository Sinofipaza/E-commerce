import http from "http";
import { app } from "./api.js";
import { app as app_cart } from "./routes/cartRoutes.js";
import { app as express_app} from "./routes/expressApp.js";

const server = http.createServer(express_app, app, app_cart).listen(3000);
