const mysql = require("mysql");
const mysqlConfig = require("./config.js");

const connection = mysql.createConnection(mysqlConfig);

connection.connect(err => {
  if (err) {
    console.log("err- not connected");
    return;
  }
  console.log("connected");
});

const getAllLines = function(callback) {
  connection.query("Select * from service_lines", (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
};

const getAllStops = function(callback, fields) {
  var sql =
    " SELECT id, name, is_favorite FROM stations WHERE id in ( SELECT station_id FROM stops WHERE line_id = ? )";
  connection.query(sql, fields, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
};

const getAllStations = function(callback) {
  var sql = " SELECT * FROM stations  ORDER BY is_favorite DESC";
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
};

const toggleFav = function(callback, id, val) {
  var sql = "UPDATE stations SET is_favorite = ? WHERE id = ?";
  connection.query(sql, [val, id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
};

module.exports = {
  getAllLines,
  getAllStops,
  getAllStations,
  toggleFav
};
