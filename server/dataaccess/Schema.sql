DROP SCHEMA IF EXISTS jerneif CASCADE;
CREATE SCHEMA IF NOT EXISTS jerneif;

-- ===========================
-- Table: Rolle
-- ===========================
CREATE TABLE jerneif.Rolle (
       RolleID SERIAL PRIMARY KEY,
       RolleNavn VARCHAR(100) NOT NULL
);

-- ===========================
-- Table: Login
-- ===========================
CREATE TABLE jerneif.Login (
       BrugerID SERIAL PRIMARY KEY,
       Brugernavn VARCHAR(100) NOT NULL UNIQUE,
       Password TEXT NOT NULL,
       RolleID INT NOT NULL,
       CONSTRAINT fk_login_rolle
           FOREIGN KEY (RolleID)
               REFERENCES jerneif.Rolle (RolleID)
               ON DELETE CASCADE
);

-- ===========================
-- Table: Profil
-- ===========================
CREATE TABLE jerneif.Profil (
        ID SERIAL PRIMARY KEY,
        FNavn VARCHAR(100) NOT NULL,
        LNavn VARCHAR(100) NOT NULL,
        Email VARCHAR(150) NOT NULL UNIQUE,
        Mobil VARCHAR(20),
        BrugerID INT NOT NULL,
        Aktiv BOOLEAN NOT NULL DEFAULT TRUE,
        RolleID int NOT NULL,
        CONSTRAINT fk_profil_login
            FOREIGN KEY (BrugerID)
                REFERENCES jerneif.Login (BrugerID)
                ON DELETE CASCADE,
        CONSTRAINT fk_profil_rolle
        FOREIGN KEY (RolleID)
        REFERENCES jerneif.Rolle (RolleID)
        ON DELETE CASCADE
);

-- ===========================
-- Table: price
-- ===========================
CREATE TABLE jerneif.Pricing (
      ID SERIAL PRIMARY KEY,
      price INT NOT NULL
);

-- ===========================
-- Table: Plade
-- ===========================
CREATE TABLE jerneif.Plade (
       ID VARCHAR(50) PRIMARY KEY,
       ValgteTal INT NOT NULL,
       Ugetal INT NOT NULL,
       Gentag BOOLEAN NOT NULL DEFAULT FALSE,
       BrugerID INT NOT NULL,
       priceID INT,
       CONSTRAINT fk_plade_login
           FOREIGN KEY (BrugerID)
               REFERENCES jerneif.Login (BrugerID)
               ON DELETE CASCADE,
       CONSTRAINT fk_plade_price
           FOREIGN KEY (priceID)
               REFERENCES jerneif.pricing (ID)
               ON DELETE CASCADE
);

-- ===========================
-- Table: Vindertal
-- ===========================
CREATE TABLE jerneif.Vindertal (
       ID SERIAL PRIMARY KEY,
       Vindertal INT NOT NULL,
       Ugetal INT NOT NULL
);
