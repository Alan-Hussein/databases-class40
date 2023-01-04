const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

function getPopulation(Country, name, code, cb) {
  con.query(
    `SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ${name} and code = ${code}`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
getPopulation("country", "Netherlands", "NLD 'OR' 1=1;", console.log);