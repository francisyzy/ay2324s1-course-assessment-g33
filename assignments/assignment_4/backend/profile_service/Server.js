const PORT = 3001;
let connectionRequest = require("./mysqlConnector");

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log("API is running on Port 3001"));

function callStoredProcQuery(storedProcName, ...args) {
  let argBuilder = "";
  for (let i = 1; i < arguments.length; i++) {
    let param = '"' + arguments[i] + '", ';
    argBuilder += param;
  }
  argBuilder = argBuilder.slice(0, -2);
  let storedProcQuery = "CALL " + storedProcName + "(" + argBuilder + ");";
  return storedProcQuery;
}

function updateSQL(stringQuery) {
  let db = connectionRequest();
  db.query(stringQuery, (err, dbres) => {
    try {
      console.log(dbres);
      if (err) {
        db.destroy();
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  });
  db.end();
}

app.post("/insert", (req, res) => {
  let db = connectionRequest();
  let userObject = req.body.user;
  let stringQuery = callStoredProcQuery(
    "peerPrepAssignment.InsertUserProfile",
    userObject.email,
    userObject.displayName,
    userObject.username,
    userObject.proficiency
  );

  db.query(stringQuery, (err, dbres) => {
    try {
      if (err) {
        db.destroy();
        throw err;
      }
      res.status(200).send("Successful Insert")
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  db.end();
});

app.post("/read", (req, res) => {
  let db = connectionRequest();
  let userObject = req.body.user;
  let stringQuery = callStoredProcQuery(
    "peerPrepAssignment.GetUserProfile",
    userObject.email
  );

  db.query(stringQuery, (err, dbres) => {
    try {
      if (err) {
        db.destroy();
        throw err;
      }
      res.status(200).send(dbres[0][0]);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  db.end();
});

app.post("/update", (req, res) => {
  let db = connectionRequest();
  let userObject = req.body.user;
  let stringQuery = callStoredProcQuery(
    "peerPrepAssignment.UpdateUserProfile",
    userObject.email,
    userObject.displayName,
    userObject.username,
    userObject.proficiency
  );

  db.query(stringQuery, (err, dbres) => {
    try {
      if (err) {
        db.destroy();
        throw err;
      }
      res.status(200).send("Successful Update")
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  db.end();
});
app.post("/delete", (req, res) => {
  let db = connectionRequest();
  let userObject = req.body.user;
  let stringQuery = callStoredProcQuery(
    "peerPrepAssignment.DeleteUserProfile",
    userObject.email
  );

  db.query(stringQuery, (err, dbres) => {
    try {
      if (err) {
        db.destroy();
        throw err;
      }
      res.status(200).send("Successful Delete")
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  db.end();
});