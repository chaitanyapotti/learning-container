const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
  host: "redis-server",
  port: 6379
});

client.set("visits", 0);

app.get("/", (req, res) => {
  process.exit(0);
  client.get("visits", (err, visits) => {
    if (err) return res.send(err);
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits, 10) + 1);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
