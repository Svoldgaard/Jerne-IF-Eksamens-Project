drop schema if exists jerneif cascade;
create schema if not exists jerneif;

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
                               Password VARCHAR(200) NOT NULL,
                               RolleID INT NOT NULL,

                               CONSTRAINT fk_login_rolle
                                   FOREIGN KEY (RolleID)
                                       REFERENCES Rolle (RolleID)
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

                                CONSTRAINT fk_profil_login
                                    FOREIGN KEY (BrugerID)
                                        REFERENCES Login (BrugerID)
                                        ON DELETE CASCADE
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

                               CONSTRAINT fk_plade_login
                                   FOREIGN KEY (BrugerID)
                                       REFERENCES Login (BrugerID)
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