-- Insertion des utilisateurs de test (mot de passe: password123)
INSERT INTO users (username, email, password, first_name, last_name, role, enabled, created_at, updated_at) VALUES
-- Administrateurs
('admin', 'admin@stages.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Admin', 'Système', 'ADMIN', true, NOW(), NOW()),

-- Enseignants
('prof.martin', 'martin@univ.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Jean', 'Martin', 'ENSEIGNANT', true, NOW(), NOW()),
('prof.durand', 'durand@univ.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Marie', 'Durand', 'ENSEIGNANT', true, NOW(), NOW()),

-- Entreprises
('tech_corp', 'contact@techcorp.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'TechCorp', 'Solutions', 'ENTREPRISE', true, NOW(), NOW()),
('digital_agency', 'rh@digitalagency.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Digital', 'Agency', 'ENTREPRISE', true, NOW(), NOW()),
('startup_innov', 'jobs@startup.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Startup', 'Innovation', 'ENTREPRISE', true, NOW(), NOW()),

-- Étudiants
('etudiant1', 'pierre.dupont@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Pierre', 'Dupont', 'ETUDIANT', true, NOW(), NOW()),
('etudiant2', 'sophie.martin@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Sophie', 'Martin', 'ETUDIANT', true, NOW(), NOW()),
('etudiant3', 'lucas.bernard@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Lucas', 'Bernard', 'ETUDIANT', true, NOW(), NOW()),
('etudiant4', 'emma.rousseau@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Emma', 'Rousseau', 'ETUDIANT', true, NOW(), NOW()),
('etudiant5', 'thomas.leroy@etudiant.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Thomas', 'Leroy', 'ETUDIANT', true, NOW(), NOW());

-- Insertion des entreprises détaillées
INSERT INTO entreprises (user_id, nom_entreprise, secteur, adresse, telephone, site_web, description, created_at, updated_at) VALUES
(4, 'TechCorp Solutions', 'Informatique', '123 Avenue des Technologies, Paris 75001', '+33123456789', 'https://techcorp.com', 'Leader en solutions technologiques innovantes', NOW(), NOW()),
(5, 'Digital Agency', 'Marketing Digital', '456 Rue du Numérique, Lyon 69001', '+33234567890', 'https://digitalagency.com', 'Agence spécialisée en transformation digitale', NOW(), NOW()),
(6, 'Startup Innovation', 'FinTech', '789 Boulevard de l''Innovation, Marseille 13001', '+33345678901', 'https://startup-innov.com', 'Startup révolutionnaire dans la FinTech', NOW(), NOW());

-- Insertion des étudiants détaillés
INSERT INTO etudiants (user_id, numero_etudiant, filiere, niveau, universite, cv_path, created_at, updated_at) VALUES
(7, 'ETU001', 'Informatique', 'Master 1', 'Université Paris-Sorbonne', '/uploads/cv/pierre_dupont_cv.pdf', NOW(), NOW()),
(8, 'ETU002', 'Marketing Digital', 'Master 2', 'INSA Lyon', '/uploads/cv/sophie_martin_cv.pdf', NOW(), NOW()),
(9, 'ETU003', 'Génie Logiciel', 'Master 1', 'Université Aix-Marseille', '/uploads/cv/lucas_bernard_cv.pdf', NOW(), NOW()),
(10, 'ETU004', 'Data Science', 'Master 2', 'Université Toulouse III', '/uploads/cv/emma_rousseau_cv.pdf', NOW(), NOW()),
(11, 'ETU005', 'Cybersécurité', 'Master 1', 'Université de Bordeaux', '/uploads/cv/thomas_leroy_cv.pdf', NOW(), NOW());

-- Insertion des enseignants détaillés
INSERT INTO enseignants (user_id, specialite, departement, universite, created_at, updated_at) VALUES
(2, 'Informatique', 'Sciences et Technologies', 'Université Paris-Sorbonne', NOW(), NOW()),
(3, 'Marketing', 'École de Commerce', 'INSA Lyon', NOW(), NOW());

-- Insertion des offres de stage
INSERT INTO offres (entreprise_id, titre, description, domaine, duree_mois, localisation, competences_requises, salaire, date_debut, date_fin, statut, created_at, updated_at) VALUES
(1, 'Développeur Full-Stack Junior', 'Rejoignez notre équipe pour développer des applications web modernes avec React et Spring Boot. Vous travaillerez sur des projets innovants dans un environnement agile.', 'Informatique', 6, 'Paris', 'Java, Spring Boot, React, PostgreSQL, Git', 1200.00, '2024-03-01', '2024-08-31', 'ACTIVE', NOW(), NOW()),

(1, 'Analyste Data Junior', 'Participez à l''analyse de données massives et à la création de tableaux de bord interactifs. Formation aux outils de Business Intelligence.', 'Data Science', 4, 'Paris', 'Python, SQL, Power BI, Excel, Statistiques', 1100.00, '2024-04-01', '2024-07-31', 'ACTIVE', NOW(), NOW()),

(2, 'Assistant Marketing Digital', 'Accompagnez nos équipes dans la mise en place de campagnes digitales multi-canaux. Gestion des réseaux sociaux et analyse des performances.', 'Marketing', 5, 'Lyon', 'Google Ads, Facebook Ads, Analytics, Photoshop, Rédaction web', 1000.00, '2024-02-15', '2024-07-15', 'ACTIVE', NOW(), NOW()),

(2, 'UX/UI Designer Stagiaire', 'Concevez des interfaces utilisateur intuitives et esthétiques. Participation aux ateliers de design thinking et tests utilisateurs.', 'Design', 6, 'Lyon', 'Figma, Adobe Creative Suite, Prototypage, User Research', 1150.00, '2024-03-15', '2024-09-15', 'ACTIVE', NOW(), NOW()),

(3, 'Développeur Mobile Flutter', 'Développement d''applications mobiles cross-platform avec Flutter. Intégration d''APIs REST et optimisation des performances.', 'Informatique', 5, 'Marseille', 'Flutter, Dart, Firebase, REST API, Git', 1300.00, '2024-04-01', '2024-08-31', 'ACTIVE', NOW(), NOW()),

(3, 'Analyste Cybersécurité', 'Participation à l''audit de sécurité des systèmes d''information. Analyse des vulnérabilités et mise en place de solutions de protection.', 'Cybersécurité', 6, 'Marseille', 'Ethical Hacking, SIEM, Firewall, Cryptographie, Linux', 1400.00, '2024-03-01', '2024-08-31', 'ACTIVE', NOW(), NOW());

-- Insertion des candidatures
INSERT INTO candidatures (etudiant_id, offre_id, lettre_motivation, statut, date_candidature, date_reponse, commentaire_entreprise, created_at, updated_at) VALUES
-- Pierre Dupont (Informatique) postule pour développeur Full-Stack
(1, 1, 'Passionné par le développement web, je souhaite mettre en pratique mes compétences en Java et React acquises durant ma formation. Votre entreprise représente pour moi l''opportunité idéale de découvrir le monde professionnel dans un environnement innovant.', 'ACCEPTEE', '2024-01-15', '2024-01-20', 'Profil très intéressant, bonnes bases techniques', NOW(), NOW()),

-- Sophie Martin (Marketing) postule pour assistant marketing
(2, 3, 'Étudiante en Master 2 Marketing Digital, je suis particulièrement attirée par les stratégies multi-canaux. Mon expérience en gestion de projets étudiants et ma créativité seront des atouts pour votre équipe.', 'EN_ATTENTE', '2024-01-18', NULL, NULL, NOW(), NOW()),

-- Lucas Bernard (Génie Logiciel) postule pour développeur mobile
(3, 5, 'Développeur passionné par les technologies mobiles, j''ai réalisé plusieurs projets personnels en Flutter. Je souhaite approfondir mes compétences dans un contexte professionnel stimulant.', 'EN_ATTENTE', '2024-01-20', NULL, NULL, NOW(), NOW()),

-- Emma Rousseau (Data Science) postule pour analyste data
(4, 2, 'Étudiante en Master 2 Data Science, j''ai une solide formation en statistiques et programmation Python. Je suis motivée par l''analyse de données et la création de visualisations impactantes.', 'ACCEPTEE', '2024-01-12', '2024-01-17', 'Excellente candidature, compétences techniques solides', NOW(), NOW()),

-- Thomas Leroy (Cybersécurité) postule pour analyste cybersécurité
(5, 6, 'Passionné par la sécurité informatique depuis le lycée, j''ai obtenu plusieurs certifications en ethical hacking. Je souhaite contribuer à la protection des systèmes d''information de votre startup.', 'REFUSEE', '2024-01-10', '2024-01-25', 'Profil intéressant mais nous recherchons un profil plus expérimenté', NOW(), NOW()),

-- Candidatures croisées pour tester les filtres
(1, 5, 'Bien que spécialisé en développement web, je suis très intéressé par le développement mobile et souhaite élargir mes compétences.', 'REFUSEE', '2024-01-22', '2024-01-28', 'Profil plus adapté au développement web', NOW(), NOW()),

(2, 4, 'Mon background en marketing me donne une perspective unique sur l''expérience utilisateur, ce qui pourrait être un atout pour vos projets de design.', 'EN_ATTENTE', '2024-01-25', NULL, NULL, NOW(), NOW());

-- Insertion de messages de test
INSERT INTO messages (expediteur_id, destinataire_id, contenu, lu, created_at) VALUES
-- Conversation entre Pierre (étudiant) et TechCorp
(7, 4, 'Bonjour, j''aimerais avoir plus d''informations sur les technologies utilisées dans votre équipe.', true, NOW() - INTERVAL '2 days'),
(4, 7, 'Bonjour Pierre, nous utilisons principalement Spring Boot pour le backend et React pour le frontend. Nous travaillons aussi avec PostgreSQL et Docker.', true, NOW() - INTERVAL '2 days'),
(7, 4, 'Parfait ! J''ai déjà travaillé avec ces technologies durant mes projets étudiants. Quand pourrions-nous organiser un entretien ?', true, NOW() - INTERVAL '1 day'),
(4, 7, 'Nous pouvons organiser un entretien la semaine prochaine. Je vous enverrai les détails par email.', false, NOW() - INTERVAL '1 day'),

-- Conversation entre Emma (étudiante) et TechCorp
(10, 4, 'Bonjour, concernant le poste d''analyste data, utilisez-vous des outils spécifiques de visualisation ?', true, NOW() - INTERVAL '3 days'),
(4, 10, 'Bonjour Emma, nous utilisons principalement Power BI et Tableau. Une connaissance de Python pour l''analyse est également requise.', true, NOW() - INTERVAL '3 days'),

-- Conversation entre Sophie (étudiante) et Digital Agency
(8, 5, 'Bonjour, j''aimerais en savoir plus sur les campagnes que vous gérez actuellement.', true, NOW() - INTERVAL '1 day'),
(5, 8, 'Bonjour Sophie, nous gérons des campagnes pour des clients dans l''e-commerce, la tech et les services. Très diversifié !', false, NOW() - INTERVAL '1 day');