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
var http = __importStar(require("http"));
var DVEDServer_js_1 = require("./DVEDServer/DVEDServer.js");
var server = http.createServer(function (request, response) {
    if (request.method == "POST") {
        var body_1 = "";
        var messageType_1 = "json";
        var contentType = request.headers["content-type"] || "";
        if (contentType.includes("dved")) {
            messageType_1 = "dved";
            request.setEncoding("utf8");
        }
        request.on("data", function (data) {
            body_1 += data;
        });
        request.on("end", function () {
            if (messageType_1 == "dved") {
                response.end(DVEDServer_js_1.DVEDServer.hanldeMessage(body_1));
            }
        });
    }
    else {
        console.log("GET");
        var html = "\n<html>\n    <body>\n    <h1>DVE Server</h1>\n    </body>\n</html>";
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(html);
    }
});
var port = 3000;
var host = "127.0.0.1";
server.listen(port, host);
console.log("Listening at http://".concat(host, ":").concat(port));
