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
-- Table: Spiluge
-- ===========================
CREATE TABLE jerneif.Spiluge (
                                 ID SERIAL PRIMARY KEY,
                                 Ugetal INT,
                                 Årstal INT,
                                 Status BOOLEAN
);

-- ===========================
-- Table: Plade
-- ===========================
CREATE TABLE jerneif.Plade (
                               ID VARCHAR(50) PRIMARY KEY,
                               UgetalID INT NOT NULL,
                               ValgteTal INT[],
                               Gentag BOOLEAN NOT NULL DEFAULT FALSE,
                               BrugerID INT NOT NULL,
                               priceID INT,
                               isWinner BOOLEAN NOT NULL DEFAULT FALSE,
                               Status BOOLEAN NOT NULL DEFAULT FALSE,
                               CONSTRAINT fk_plade_login
                                   FOREIGN KEY (BrugerID)
                                       REFERENCES jerneif.Login (BrugerID)
                                       ON DELETE CASCADE,
                               CONSTRAINT fk_plade_price
                                   FOREIGN KEY (priceID)
                                       REFERENCES jerneif.pricing (ID)
                                       ON DELETE CASCADE,
                               CONSTRAINT fk_plade_spiluge
                                   FOREIGN KEY (UgetalID)
                                       REFERENCES jerneif.Spiluge (ID)
                                       ON DELETE CASCADE


);

-- CREATE TABLE jerneif.PladeTal (
--     ID SERIAL PRIMARY KEY,
--     PladeID VARCHAR(50) NOT NULL,
--     Tal INT NOT NULL,
--     
--     CONSTRAINT fk_pladetal_plade
--                               FOREIGN KEY (PladeID)
--                               REFERENCES jerneif.Plade (ID)
--                               ON DELETE CASCADE 
-- );    

-- ===========================
-- Table: VinderSekvens
-- ===========================
CREATE TABLE jerneif.VinderSekvens (
                                       ID SERIAL PRIMARY KEY,
                                       Vindertal INT[],
                                       SpilugeID INT NOT NULL,

                                       CONSTRAINT fk_vindersekvens_spiluge
                                           FOREIGN KEY (SpilugeID)
                                               REFERENCES jerneif.Spiluge(ID)
                                               ON DELETE CASCADE
);



