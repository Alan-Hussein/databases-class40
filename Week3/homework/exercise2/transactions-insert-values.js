const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "accounts",
});

connection.connect(() => {
  connection.query(
    `INSERT INTO account (balance) VALUES (10000), (11000), (15000), (17000), (20000)`
  );
  connection.query(`INSERT INTO account_changes (account_number, amount, changed_date, remark) 
  VALUES (101, 10000 , '2022-12-01', 'salary'), (102, -1000, '2022-12-02', 'rent'),
  (103, -750, '2022-12-05', 'Electricity bill'), (104, -250, '2022-12-12', 'Gas bill'),
  `);
});
