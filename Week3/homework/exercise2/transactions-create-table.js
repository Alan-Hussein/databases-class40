const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect(() => {
  connection.query(`DROP DATABASE IF EXISTS accounts`);
  connection.query(`CREATE DATABASE accounts`);
  connection.query(`USE accounts`);

  connection.query(`CREATE TABLE account (
    account_number INT PRIMARY KEY AUTO_INCREMENT, 
    balance INT
  )`);

  connection.query(`CREATE TABLE account_changes (
    change_number INT PRIMARY KEY AUTO_INCREMENT, 
    account_number INT,
    amount INT,
    changed_date DATE,
    remark VARCHAR(32),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
  )`);

  connection.query(`ALTER TABLE account AUTO_INCREMENT = 100`);
});
