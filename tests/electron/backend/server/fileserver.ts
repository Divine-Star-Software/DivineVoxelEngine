import * as http from "http";
import * as fs from "fs/promises";
type LocationData = [dimension: string, x: number, y: number, z: number];
type DVELoadMessages = {
 type: "load-region";
 location: LocationData;
};
type DVESaveMessages = {
 type: "save-region";
 location: LocationData;
 buffer: ArrayBuffer;
};

type DVEMessages = DVELoadMessages | DVESaveMessages;

const getRegionName = (location: LocationData) => {
 return `region_${location[0]}_${location[1]}_${location[2]}_${location[3]}.dved`;
};


const server = http.createServer(function (request, response) {
 if (request.method == "POST") {
  console.log("POST");
  let body = "";
  let messageType: "dve" | "json" = "json";

  const contentType = request.headers["content-type"] || "";
  if (contentType.includes("dve")) {
   messageType = "dve";
    request.setEncoding("utf8");
  }
  request.on("data", function (data) {
   body += data;
   console.log("adding data")
  });
  request.on("end", async function () {
   if (messageType == "json") {
    const message = JSON.parse(body);
    console.log(message);
    if (message.type == "load-region") {
     response.writeHead(200, { "Content-Type": "application/arraybuffer" });
     const regionString = await fs.readFile(
      `./data/${getRegionName(message.location)}`,
      {
       encoding: "utf8",
      }
     );
     console.log(regionString.length);
     response.end(regionString);
    }
   }
   if (messageType == "dve") {
    let jsonString = "";
    let pipeCount = 0;
    let finalCount = 0;
    for (let i = 0; i < body.length; i++) {
     let char = body[i];
     finalCount++;
     if (char == "|") {
      pipeCount++;
      if (pipeCount == 2) break;
      continue;
     }
     jsonString += char;
    }
    const json = <DVEMessages>JSON.parse(jsonString);
    console.log(body.length);
    const regionString = body.substring(finalCount);
    console.log(body.substring(0,finalCount + 10))
    await fs.writeFile(`./data/${getRegionName(json.location)}`, regionString, {
     encoding: "utf8",
    });
    console.log(json);
    console.log(regionString.length);
    // console.log(JSON.parse(jsonString));
    response.end("1");
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
