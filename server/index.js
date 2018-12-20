const express = require("express");
const bodyParser = require("body-parser");

const db = require("../database-mysql");

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../react-client/dist"));

app.get("/api/lines", (req, res) => {
  db.getAllLines((err, lines) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(lines);
    }
  });
});

app.get("/api/lines/:lineId", (req, res) => {
  let fields = req.params.lineId;
  db.getAllStops((err, stops) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(stops);
    }
  }, fields);
});

app.get("/api/stations", (req, res) => {
  db.getAllStations((err, stations) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(stations);
    }
  });
});

app.post("/", (req, res) => {
  let id = req.body.id;
  let val = req.body.val;
  db.toggleFav(
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(result);
        res.json(result);
      }
    },
    id,
    val
  );
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
