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
  CREATE TABLE IF NOT EXISTS research_Papers(
    paper_id INT PRIMARY KEY AUTO_INCREMENT,
    paper_title VARCHAR(30),
    conference VARCHAR(30),
    publish_date DATE
  );`);

  connection.query(`CREATE TABLE IF NOT EXISTS authors_papers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id));
  `);

  connection.query(`INSERT INTO authors(author_name, university, date_of_birth, h_index, gender, mentor)
  VALUES 
  ("Alan","Leeuwaredn Uni","1978-01-01",3,"m",1),
  ("Mark","Amsterdam Uni","1987-02-01",1,"m",2),
  ("joe","Arnhem Uni","1967-03-01",2,"m",1),
  ("johan","London Uni","1980-01-01",4,"m",3),
  ("Sara","Paris Uni","1981-04-01",6,"f",2),
  ("Yasser","Den Haag Uni","1984-05-01",7,"m",1),
  ("Ahmed","Delft Uni","1967-06-01",5,"m",3),
  ("lana","Utrecht Uni","1967-07-01",9,"f",3),
  ("Yara","Roterdam Uni","1980-08-01",8,"f",4),
  ("Lina","Drachten Uni","1980-09-01",3,"f",1),
  ("majed","Amsterdam Uni","1977-10-01",5,"m",4),
  ("sally","Leeuwaredn Uni","1976-11-01",1,"f",2),
  ("Yaman","Paris Uni","1980-12-01",4,"m",4),
  ("Heba","London Uni","1981-01-01",2,"f",1),
  ("Fatima","Leeuwaredn Uni","1975-01-01",9,"f",4);`);

  connection.query(`INSERT INTO research_Papers(paper_title, conference, publish_date)
  VALUES 
  ("Paper_title1","conference","2005-01-01") ,
  ("Paper_title2","conference","2004-01-01") ,
  ("Paper_title3","conference","2003-01-01") ,
  ("Paper_title4","conference","2004-01-01") ,
  ("Paper_title5","conference","2005-01-01") ,
  ("Paper_title6","conference","2001-01-01") ,
  ("Paper_title7","conference","2000-01-01") ,
  ("Paper_title8","conference","2005-01-01") ,
  ("Paper_title9","conference","2004-01-01") ,
  ("Paper_title10","conference","2004-01-01") ,
  ("Paper_title11","conference","2001-01-01") ,
  ("Paper_title12","conference","2001-01-01") ,
  ("Paper_title13","conference","2005-01-01") ,
  ("Paper_title14","conference","2006-01-01") ,
  ("Paper_title15","conference","2004-01-01") ,
  ("Paper_title16","conference","2005-01-01") ,
  ("Paper_title17","conference","2001-01-01") ,
  ("Paper_title18","conference","2000-01-01") ,
  ("Paper_title19","conference","2001-01-01") ,
  ("Paper_title20","conference","2005-01-01") ,
  ("Paper_title21","conference","2005-01-01") ,
  ("Paper_title22","conference","2004-01-01") ,
  ("Paper_title23","conference","2007-01-01") ,
  ("Paper_title24","conference","2007-01-01") ,
  ("Paper_title25","conference","2001-01-01") ,
  ("Paper_title26","conference","2000-01-01") ,
  ("Paper_title27","conference","2005-01-01") ,
  ("Paper_title28","conference","2005-01-01") ,
  ("Paper_title29","conference","2001-01-01") ,
  ("Paper_title30","conference","2002-01-01") ;
  `);

  connection.query(`INSERT authors_papers(author_id, paper_id) 
  VALUES(1,1),(5,12),(12,7),(13,15),(5,27),(17,18),
              (8,5),(11,18),(5,13),(7,1),(10,13),(12,25),
              (1,8),(4,2),(12,4),(8,6),(3,21),(1,12),
              (6,13),(13,26),(7,22),(11,16),(6,1),(7,3),
              (4,1),(10,25),(7,10),(13,14),(9,15),(1,9);
`);
  connection.end();
});
