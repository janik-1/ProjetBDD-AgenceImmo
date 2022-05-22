const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "projetbdd",
});

app.post("/createlog", (req, res) => {
  const nomlog = req.body.nomlog;
  const nbpiece = req.body.nbpiece;
  const etat = req.body.etat;
  const adresse = req.body.adresse;
  const prix = req.body.prix;
  const datedispo = req.body.dated;
  const ville = req.body.ville;
  const superficie = req.body.superficie;
  // au dessus que si on envoie des infos la bas
  db.query(
    "INSERT INTO Logement (Nomlog,NbPièces,Etat,Adresse,Prix,DateDispo,Ville,Superficie) VALUES (?,?,?,?,?,?,?,?)",
    [nomlog, nbpiece, etat, adresse, prix, datedispo, ville, superficie],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const nomlog = req.body.nomlog;
  const nbpiece = req.body.nbpiece;
  const etat = req.body.etat;
  const adresse = req.body.adresse;
  const prix = req.body.prix;
  const datedispo = req.body.dated;
  const ville = req.body.ville;
  const superficie = req.body.superficie;

  db.query(
    "UPDATE Logement SET Nomlog = ?, NbPièces = ?,Etat= ?,Adresse= ?,Prix= ?,DateDispo =DATE_FORMAT(STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z'),'%Y-%m-%d %H:%i:%s'),Ville= ?,Superficie= ? where Identifiant = ?",
    [nomlog, nbpiece, etat, adresse, prix, datedispo, ville, superficie, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getlog", (req, res) => {
  db.query("Select * from Logement", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletelog/:identifiant", (req, res) => {
  const identifiant = req.params.identifiant;
  db.query(
    "Delete from Logement where Identifiant = ?",
    identifiant,

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Deleted");
      }
    }
  );
});

app.post("/newvisit", (req, res) => {
  const identifiant = req.body.identifiant;
  const datevisit = req.body.datevisit;
  const nompers = req.body.nompers;
  const prenompers = req.body.prenompers;
  db.query(
    "INSERT INTO Personne (Nom,Prenom) VALUES (?,?); INSERT Into visite (DateVisite,Identifiant,Prenom,Nom) VALUES (?,?,?,?) ",
    [nompers, prenompers, datevisit, identifiant, prenompers, nompers],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/getlogvendus", (req, res) => {
  db.query(
    "Select * from Logement L,achete A where L.Identifiant = A.Identifiant;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(8000, () => {
  console.log("yes your server is running");
});
