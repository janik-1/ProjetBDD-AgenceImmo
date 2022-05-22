use projetbdd;

CREATE TABLE Logement(
   Identifiant INT AUTO_INCREMENT,
   NbPièces INT NOT NULL,
   Etat VARCHAR(50),
   Adresse VARCHAR(70),
   Prix INT NOT NULL,
   DateDispo DATE,
   Ville VARCHAR(50) NOT NULL,
   Superficie INT NOT NULL,
   Nomlog VARCHAR(50),
   PRIMARY KEY(Identifiant)
);

CREATE TABLE Garage(
   IdGarage INT AUTO_INCREMENT,
   Adresse VARCHAR(70),
   Identifiant INT NOT NULL,
   PRIMARY KEY(IdGarage),
   FOREIGN KEY(Identifiant) REFERENCES Logement(Identifiant)
);

CREATE TABLE Personne(
   Nom VARCHAR(50),
   Prenom VARCHAR(50),
   PRIMARY KEY(Nom, Prenom)
);

CREATE TABLE Visite(
   Identifiant INT,
   Nom VARCHAR(50),
   Prenom VARCHAR(50),
   DateVisite VARCHAR(50) NOT NULL,
   PRIMARY KEY(Identifiant, Nom, Prenom),
   FOREIGN KEY(Identifiant) REFERENCES Logement(Identifiant),
   FOREIGN KEY(Nom, Prenom) REFERENCES Personne(Nom, Prenom)
);

CREATE TABLE Achete(
   Identifiant INT,
   Nom VARCHAR(50),
   Prenom VARCHAR(50),
   PourcentagePrixVente INT,
   MontantTotal INT,
   DateVente DATE,
   PRIMARY KEY(Identifiant, Nom, Prenom),
   FOREIGN KEY(Identifiant) REFERENCES Logement(Identifiant),
   FOREIGN KEY(Nom, Prenom) REFERENCES Personne(Nom, Prenom)
);

ALTER TABLE Logement MODIFY COLUMN DateDispo datetime;

INSERT Into INSERT INTO visite  (DateVisite,Identifiant,Prenom,Nom) VALUES ('2022-05-26',1,'Fardeen','POOREEA') ;
