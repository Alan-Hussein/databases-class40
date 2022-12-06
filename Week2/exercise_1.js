const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

connection.connect((err) => {
  if (err) throw err;

  console.log("Connected!");

  connection.query(`CREATE TABLE IF NOT EXISTS authors(
    author_id INT AUTO_INCREMENT, 
    author_name VARCHAR(32), 
    university VARCHAR(32), 
    date_of_birth DATE, 
    h_index INT, 
    gender ENUM('m','f'),
    PRIMARY KEY (author_id)
    )`);

  connection.query(`ALTER TABLE authors ADD mentor INT`);

  connection.query(
    `ALTER TABLE authors ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)`
  );

  connection.end();
});
