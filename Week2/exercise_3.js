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

  connection.query(`
      SELECT t1.author_name , t2.author_name
      FROM authors AS t1
      JOIN authors AS t2
      ON t1.author_id=t2.mentor;`);

  connection.query(`
      SELECT author_name,paper_title FROM authors
      LEFT JOIN authors_papers
      ON authors.author_id=authors_papers.author_id
      LEFT JOIN  research_Papers
      ON authors_papers.paper_id=research_Papers.paper_id;`);

  connection.end();
});
