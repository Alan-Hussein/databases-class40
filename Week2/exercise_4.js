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
    SELECT research_Papers.paper_title, COUNT(research_Papers.paper_title) FROM authors
    JOIN authors_papers
    ON authors.author_id=authors_papers.author_id
    JOIN research_Papers
    ON authors_papers.paper_id=research_Papers.paper_id
    GROUP BY research_Papers.paper_title;
`);

  connection.query(`
    SELECT gender, COUNT(research_Papers.paper_title)
    FROM authors
	  LEFT JOIN authors_papers
    ON authors.author_id=authors_papers.author_id
    LEFT JOIN research_Papers
    ON authors_papers.paper_id=research_Papers.paper_id
    WHERE gender="f";`);

  connection.query(`
    SELECT university, AVG(h_index) 
    FROM authors
    GROUP BY university;
  `);

  connection.query(`
    SELECT authors.university,COUNT(authors_papers.paper_id) FROM authors
    LEFT JOIN authors_papers
    ON authors.author_id=authors_papers.author_id
    GROUP BY authors.university;
  `);

  connection.query(`
    SELECT university, MAX(h_index) AS MAX_value, MIN(h_index) AS MIN_value
    FROM authors 
    GROUP BY university;
  `);

  connection.end();
});

//OR I can use another way (make a array for queries and use forEach ) 

