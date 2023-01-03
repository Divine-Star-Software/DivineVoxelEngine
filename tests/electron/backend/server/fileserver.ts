import * as http from "http";
import { DVEDServer } from "./DVEDServer/DVEDServer.js";

const server = http.createServer(function (request, response) {
 if (request.method == "POST") {
  let body = "";
  let messageType: "dved" | "json" = "json";

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
    response.end(DVEDServer.hanldeMessage(body));
   }
  });
 } else {
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
