-- =============================================
-- Script SQL pour le Système de Gestion de Stages
-- Base de données: gestion_stages
-- Version: 1.0
-- Date: 18/09/2024
-- =============================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestion_stages;
USE gestion_stages;

-- =============================================
-- CRÉATION DES TABLES
-- =============================================

-- Table des utilisateurs
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('ETUDIANT', 'ENTREPRISE', 'ENSEIGNANT', 'ADMIN') NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des entreprises
CREATE TABLE entreprises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    nom_entreprise VARCHAR(200) NOT NULL,
    secteur VARCHAR(100),
    adresse TEXT,
    telephone VARCHAR(20),
    site_web VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des étudiants
CREATE TABLE etudiants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    numero_etudiant VARCHAR(20) UNIQUE,
    filiere VARCHAR(100),
    niveau VARCHAR(50),
    universite VARCHAR(200),
    cv_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des enseignants
CREATE TABLE enseignants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    specialite VARCHAR(100),
    departement VARCHAR(100),
    universite VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des offres de stage
CREATE TABLE offres (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    entreprise_id BIGINT NOT NULL,
    titre VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    domaine VARCHAR(100) NOT NULL,
    duree_mois INT NOT NULL,
    localisation VARCHAR(100) NOT NULL,
    competences_requises TEXT,
    salaire DECIMAL(10,2),
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    statut ENUM('ACTIVE', 'INACTIVE', 'POURVUE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(id) ON DELETE CASCADE,
    FULLTEXT(titre, description, competences_requises)
);

-- Table des candidatures
CREATE TABLE candidatures (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    etudiant_id BIGINT NOT NULL,
    offre_id BIGINT NOT NULL,
    lettre_motivation TEXT NOT NULL,
    statut ENUM('EN_ATTENTE', 'ACCEPTEE', 'REFUSEE') DEFAULT 'EN_ATTENTE',
    date_candidature TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_reponse TIMESTAMP NULL,
    commentaire_entreprise TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (etudiant_id) REFERENCES etudiants(id) ON DELETE CASCADE,
    FOREIGN KEY (offre_id) REFERENCES offres(id) ON DELETE CASCADE,
    UNIQUE KEY unique_candidature (etudiant_id, offre_id)
);

-- Table des conventions
CREATE TABLE conventions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    candidature_id BIGINT NOT NULL,
    enseignant_id BIGINT,
    statut ENUM('EN_ATTENTE', 'VALIDEE', 'REJETEE', 'SIGNEE') DEFAULT 'EN_ATTENTE',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_validation TIMESTAMP NULL,
    commentaire_enseignant TEXT,
    pdf_path VARCHAR(500),
    signature_electronique BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (candidature_id) REFERENCES candidatures(id) ON DELETE CASCADE,
    FOREIGN KEY (enseignant_id) REFERENCES enseignants(id) ON DELETE SET NULL
);

-- Table des messages
CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    expediteur_id BIGINT NOT NULL,
    destinataire_id BIGINT NOT NULL,
    contenu TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (expediteur_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destinataire_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================
-- INSERTION DES DONNÉES DE TEST
-- =============================================

-- Utilisateurs (mot de passe: password123)
INSERT INTO users (username, email, password, first_name, last_name, role, enabled) VALUES
('admin', 'admin@stages.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Admin', 'Système', 'ADMIN', true),
('prof.martin', 'martin@univ.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Jean', 'Martin', 'ENSEIGNANT', true),
('prof.durand', 'durand@univ.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Marie', 'Durand', 'ENSEIGNANT', true),
('tech_corp', 'contact@techcorp.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'TechCorp', 'Solutions', 'ENTREPRISE', true),
('digital_agency', 'rh@digitalagency.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Digital', 'Agency', 'ENTREPRISE', true),
('startup_innov', 'jobs@startup.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Startup', 'Innovation', 'ENTREPRISE', true),
('etudiant1', 'pierre.dupont@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Pierre', 'Dupont', 'ETUDIANT', true),
('etudiant2', 'sophie.martin@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Sophie', 'Martin', 'ETUDIANT', true),
('etudiant3', 'lucas.bernard@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Lucas', 'Bernard', 'ETUDIANT', true),
('etudiant4', 'emma.rousseau@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Emma', 'Rousseau', 'ETUDIANT', true),
('etudiant5', 'thomas.leroy@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Thomas', 'Leroy', 'ETUDIANT', true);

-- Entreprises détaillées
INSERT INTO entreprises (user_id, nom_entreprise, secteur, adresse, telephone, site_web, description) VALUES
(4, 'TechCorp Solutions', 'Informatique', '123 Avenue des Technologies, Paris 75001', '+33123456789', 'https://techcorp.com', 'Leader en solutions technologiques innovantes'),
(5, 'Digital Agency', 'Marketing Digital', '456 Rue du Numérique, Lyon 69001', '+33234567890', 'https://digitalagency.com', 'Agence spécialisée en transformation digitale'),
(6, 'Startup Innovation', 'FinTech', '789 Boulevard de l''Innovation, Marseille 13001', '+33345678901', 'https://startup-innov.com', 'Startup révolutionnaire dans la FinTech');

-- Étudiants détaillés
INSERT INTO etudiants (user_id, numero_etudiant, filiere, niveau, universite, cv_path) VALUES
(7, 'ETU001', 'Informatique', 'Master 1', 'Université Paris-Sorbonne', '/uploads/cv/pierre_dupont_cv.pdf'),
(8, 'ETU002', 'Marketing Digital', 'Master 2', 'INSA Lyon', '/uploads/cv/sophie_martin_cv.pdf'),
(9, 'ETU003', 'Génie Logiciel', 'Master 1', 'Université Aix-Marseille', '/uploads/cv/lucas_bernard_cv.pdf'),
(10, 'ETU004', 'Data Science', 'Master 2', 'Université Toulouse III', '/uploads/cv/emma_rousseau_cv.pdf'),
(11, 'ETU005', 'Cybersécurité', 'Master 1', 'Université de Bordeaux', '/uploads/cv/thomas_leroy_cv.pdf');

-- Enseignants détaillés
INSERT INTO enseignants (user_id, specialite, departement, universite) VALUES
(2, 'Informatique', 'Sciences et Technologies', 'Université Paris-Sorbonne'),
(3, 'Marketing', 'École de Commerce', 'INSA Lyon');

-- Offres de stage
INSERT INTO offres (entreprise_id, titre, description, domaine, duree_mois, localisation, competences_requises, salaire, date_debut, date_fin, statut) VALUES
(1, 'Développeur Full-Stack Junior', 'Rejoignez notre équipe pour développer des applications web modernes avec React et Spring Boot.', 'Informatique', 6, 'Paris', 'Java, Spring Boot, React, PostgreSQL, Git', 1200.00, '2024-03-01', '2024-08-31', 'ACTIVE'),
(1, 'Analyste Data Junior', 'Participez à l''analyse de données massives et à la création de tableaux de bord interactifs.', 'Data Science', 4, 'Paris', 'Python, SQL, Power BI, Excel, Statistiques', 1100.00, '2024-04-01', '2024-07-31', 'ACTIVE'),
(2, 'Assistant Marketing Digital', 'Accompagnez nos équipes dans la mise en place de campagnes digitales multi-canaux.', 'Marketing', 5, 'Lyon', 'Google Ads, Facebook Ads, Analytics, Photoshop', 1000.00, '2024-02-15', '2024-07-15', 'ACTIVE'),
(2, 'UX/UI Designer Stagiaire', 'Concevez des interfaces utilisateur intuitives et esthétiques.', 'Design', 6, 'Lyon', 'Figma, Adobe Creative Suite, Prototypage', 1150.00, '2024-03-15', '2024-09-15', 'ACTIVE'),
(3, 'Développeur Mobile Flutter', 'Développement d''applications mobiles cross-platform avec Flutter.', 'Informatique', 5, 'Marseille', 'Flutter, Dart, Firebase, REST API, Git', 1300.00, '2024-04-01', '2024-08-31', 'ACTIVE'),
(3, 'Analyste Cybersécurité', 'Participation à l''audit de sécurité des systèmes d''information.', 'Cybersécurité', 6, 'Marseille', 'Ethical Hacking, SIEM, Firewall, Linux', 1400.00, '2024-03-01', '2024-08-31', 'ACTIVE');

-- Candidatures
INSERT INTO candidatures (etudiant_id, offre_id, lettre_motivation, statut, date_candidature, date_reponse, commentaire_entreprise) VALUES
(1, 1, 'Passionné par le développement web, je souhaite mettre en pratique mes compétences acquises durant ma formation.', 'ACCEPTEE', '2024-01-15', '2024-01-20', 'Profil très intéressant'),
(2, 3, 'Étudiante en Master 2 Marketing Digital, je suis attirée par les stratégies multi-canaux.', 'EN_ATTENTE', '2024-01-18', NULL, NULL),
(3, 5, 'Développeur passionné par les technologies mobiles, j''ai réalisé plusieurs projets en Flutter.', 'EN_ATTENTE', '2024-01-20', NULL, NULL),
(4, 2, 'Étudiante en Data Science, j''ai une solide formation en statistiques et Python.', 'ACCEPTEE', '2024-01-12', '2024-01-17', 'Excellente candidature'),
(5, 6, 'Passionné par la cybersécurité, j''ai obtenu plusieurs certifications.', 'REFUSEE', '2024-01-10', '2024-01-25', 'Profil intéressant mais manque d''expérience');

-- Messages
INSERT INTO messages (expediteur_id, destinataire_id, contenu, lu) VALUES
(7, 4, 'Bonjour, j''aimerais avoir plus d''informations sur les technologies utilisées.', true),
(4, 7, 'Nous utilisons Spring Boot, React, PostgreSQL et Docker.', true),
(10, 4, 'Concernant le poste d''analyste data, quels outils utilisez-vous ?', true),
(4, 10, 'Nous utilisons Power BI, Tableau et Python pour l''analyse.', false);

-- Conventions
INSERT INTO conventions (candidature_id, enseignant_id, statut, date_creation) VALUES
(1, 1, 'EN_ATTENTE', NOW()),
(4, 2, 'VALIDEE', NOW());

/*
COMPTES DE TEST (mot de passe: password123):

ADMIN: admin
ENSEIGNANTS: prof.martin, prof.durand  
ENTREPRISES: tech_corp, digital_agency, startup_innov
ÉTUDIANTS: etudiant1, etudiant2, etudiant3, etudiant4, etudiant5

6 offres actives, 5 candidatures, 2 conventions, messagerie fonctionnelle
*/