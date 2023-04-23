let http = require("http");
let path = require("path");
let url = require("url");
let fs = require("fs");

let PORT = 5000;

http
  .createServer(function (req, res) {
    let filename = req.url.slice(1);
    if (req.url === "/" || req.url === "home" || req.url === "home.html") {
      fs.readFile("index.html", (err, data) => {
        return res.end(data);
      });
    }

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        fs.readFile("404.html", function (err, data) {
          return res.end(data);
        });

        return res.end;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.write("Filename: " + filename);
      return res.end();
    });
  })
  .listen(PORT);

console.log(`Server runnin on port ${PORT}!`);
