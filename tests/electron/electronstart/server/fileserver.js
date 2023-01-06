"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const DVEDServer_js_1 = require("./DVEDServer/DVEDServer.js");
const server = http.createServer(function (request, response) {
    if (request.method == "POST") {
        let body = "";
        let messageType = "json";
        const contentType = request.headers["content-type"] || "";
        if (contentType.includes("dved")) {
            messageType = "dved";
            request.setEncoding("utf8");
        }
        request.on("data", (data) => {
            body += data;
        });
        request.on("end", () => {
            if (messageType == "dved") {
                response.end(DVEDServer_js_1.DVEDServer.hanldeMessage(body));
            }
        });
    }
    else {
        console.log("GET");
        let html = `
<html>
    <body>
    <h1>DVE Server</h1>
    </body>
</html>`;
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(html);
    }
});
const port = 3000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);
