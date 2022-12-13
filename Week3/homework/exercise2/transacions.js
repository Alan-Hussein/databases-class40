const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "accounts",
});

connection.connect(() => {
  try {
    connection.query(`SET AUTOCOMMIT = 0`);
    connection.query(`START TRANSACTION`);
    connection.query(`
      UPDATE account 
      SET balance = balance - 1000 
      WHERE account_number = 101 `);

    connection.query(`
      UPDATE account 
      SET balance = balance + 1000 
      WHERE account_number = 102 `);

    connection.query(`
      INSERT INTO account_changes (account_number, amount, changed_date, remark) 
        VALUES(101, -1000 , '2022-12-01', 'bill'),
              (102, 1000 , '2022-12-01', 'gift')
      `);

    connection.query(`COMMIT`);
  } catch (err) {
    connection.query(`ROLLBACK`);
  }
});
