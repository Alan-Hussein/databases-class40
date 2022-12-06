const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect(() => {
  connection.query(`DROP TABLE Invitee, Room, Meeting`);

  connection.query(`CREATE TABLE Invitee (
      invitee_no INT PRIMARY KEY, 
      invitee_name VARCHAR(64), 
      invited_by VARCHAR(64)
    )`);

  connection.query(`CREATE TABLE Room (
    room_no INT PRIMARY KEY, 
    room_name VARCHAR(64) , 
    floor_number INT
  )`);

  connection.query(`CREATE TABLE Meeting (
    meeting_no INT PRIMARY KEY,
    meeting_title VARCHAR(64), 
    starting_time DATETIME, 
    ending_time DATETIME,
    room_no INT, 
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )`);

  connection.query(
    `INSERT INTO Invitee 
  Value (1,'Alan','Hussain'),
    (2,'Joe','Doe'),
    (3,'Alex','Pol'),
    (4,'Max','Ston'),
    (5,'Sara','Hussain');`
  );
  connection.query(
    `INSERT INTO Room 
    value (1,'Problem-solving Room',4),
    (2,'Decision-making Room',5),
    (3,'planning Room',2),
    (4,'Feedback Room',1),
    (5,'Status Room',5);`
  );
  connection.query(
    `INSERT INTO Meeting
   value (1,'Problem-solving meetings','2022-11-30 12:00:00','2022-11-30 13:30:00',4),
    (2,'Decision-making meetings','2022-12-1 13:00:00','2022-12-1 14:00:00',5),
    (3,'Quarterly planning meetings','2022-12-7 14:30:00','2022-12-7 15:30:00',2),
    (4,'Feedback and retrospective meetings','2022-12-15 11:00:00','2022-12-15 12:00:00',1),
    (5,'Status update meetings','2022-12-20 11:30:00','2022-12-20 13:30:00',5);`
  );
  connection.end();
});
