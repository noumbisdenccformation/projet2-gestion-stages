# Système de Gestion de Stages pour Université

## 🎯 Objectif
Plateforme complète permettant aux étudiants de trouver/postuler à des stages, aux entreprises de publier des offres, aux enseignants de valider les conventions et aux administrateurs de superviser le processus.

## 🏗️ Architecture

### Frontend (Angular 17 + Tailwind CSS)

**Interface Étudiant:**
- 🔍 Recherche avancée d'offres (filtres : domaine, durée, localisation)
- 📄 Postulation en ligne avec upload CV (PDF) et lettre de motivation
- 📊 Suivi des candidatures avec statuts visuels et notifications temps réel

**Interface Entreprise:**
- ➕ Publication d'offres avec formulaire structuré
- 👥 Gestion des candidatures (acceptation/rejet avec feedback)
- 💬 Messagerie intégrée (WebSocket)

**Interface Enseignant:**
- ✅ Validation des conventions avec visualisation PDF
- 📈 Tableau de bord avec statistiques par filière
- 🚨 Alertes pour conventions manquantes

**Interface Admin:**
- 👨💻 Gestion des comptes et rôles
- 📤 Reporting avec export Excel des stages par filière
- 📊 Graphiques Chart.js

### Backend (Spring Boot 3)

**Authentification (JWT + Rôles):**
- 🔒 4 rôles : étudiant, entreprise, enseignant, admin
- 🛡️ Sécurité Spring Security avec protection des routes

**API REST:**
- 🏢 Gestion des offres avec filtrage avancé
- 📑 Conventions avec génération PDF (Apache PDFBox)
- 💬 Messagerie instantanée WebSocket

**Workflows Métier:**
- 🔄 Validation en cascade : Publication → Postulation → Validation → Approbation
- ⏰ Alertes automatiques par email (JavaMail)

## 🚀 Installation et Démarrage

### Prérequis
- Java 17+
- Node.js 18+
- PostgreSQL 13+
- Maven 3.6+

### Base de données
```bash
# Créer la base PostgreSQL
createdb gestion_stages

# Importer les données de test
psql -d gestion_stages -f database/stages_export.sql
```

### Backend Spring Boot
```bash
cd backend
mvn spring-boot:run
```
API disponible sur http://localhost:8080

### Frontend Angular
```bash
cd frontend
npm install
ng serve
```
Application disponible sur http://localhost:4200

## 👥 Comptes de Test

**Mot de passe unique:** `password123`

| Rôle | Username | Email | Description |
|------|----------|-------|-------------|
| **Admin** | `admin` | admin@stages.com | Supervision complète |
| **Enseignant** | `prof.martin` | martin@univ.com | Informatique |
| **Enseignant** | `prof.durand` | durand@univ.com | Marketing |
| **Entreprise** | `tech_corp` | contact@techcorp.com | TechCorp Solutions |
| **Entreprise** | `digital_agency` | rh@digitalagency.com | Digital Agency |
| **Entreprise** | `startup_innov` | jobs@startup.com | Startup Innovation |
| **Étudiant** | `etudiant1` | pierre.dupont@etudiant.com | Informatique M1 |
| **Étudiant** | `etudiant2` | sophie.martin@etudiant.com | Marketing M2 |
| **Étudiant** | `etudiant3` | lucas.bernard@etudiant.com | Génie Logiciel M1 |
| **Étudiant** | `etudiant4` | emma.rousseau@etudiant.com | Data Science M2 |
| **Étudiant** | `etudiant5` | thomas.leroy@etudiant.com | Cybersécurité M1 |

## 🌐 URLs de Test
- **Application:** http://localhost:4200
- **API Backend:** http://localhost:8080
- **Documentation API:** http://localhost:8080/swagger-ui.html

## 📊 Données de Test

### Offres de Stage (6 offres actives)
- **TechCorp:** Développeur Full-Stack, Analyste Data
- **Digital Agency:** Assistant Marketing, UX/UI Designer
- **Startup Innovation:** Développeur Mobile Flutter, Analyste Cybersécurité

### Candidatures (5 candidatures)
- 2 acceptées (Pierre → Dev Full-Stack, Emma → Analyste Data)
- 2 en attente (Sophie → Marketing, Lucas → Mobile)
- 1 refusée (Thomas → Cybersécurité)

### Conventions (2 conventions)
- 1 en attente de validation
- 1 validée par enseignant

### Messagerie
- Conversations actives entre étudiants et entreprises
- Système de notifications en temps réel

## 🛠️ Stack Technique

| Composant | Technologies |
|-----------|-------------|
| **Frontend** | Angular 17, Tailwind CSS, PrimeNG, WebSocket |
| **Backend** | Spring Boot 3, JWT, Spring Security |
| **Base de données** | PostgreSQL avec index Full-text |
| **PDF** | Apache PDFBox |
| **Email** | JavaMail |
| **Export** | Apache POI (Excel) |
| **Messagerie** | WebSocket |
| **Documentation** | Swagger/OpenAPI |

## 📁 Structure du Projet

```
gestion-stages/
├── backend/                    # API Spring Boot 3
│   ├── src/main/java/com/gestionstages/
│   │   ├── entity/            # Entités JPA
│   │   ├── repository/        # Repositories
│   │   ├── service/           # Services métier
│   │   ├── controller/        # Contrôleurs REST
│   │   ├── config/            # Configuration
│   │   └── security/          # Sécurité JWT
│   └── src/main/resources/
│       ├── application.yml    # Configuration
│       └── data.sql          # Données de test
├── frontend/                  # Application Angular 17
│   └── src/app/
│       ├── features/         # Modules par rôle
│       │   ├── etudiant/     # Interface étudiant
│       │   ├── entreprise/   # Interface entreprise
│       │   ├── enseignant/   # Interface enseignant
│       │   └── admin/        # Interface admin
│       ├── core/             # Services, guards, models
│       └── shared/           # Composants partagés
├── database/                 # Scripts SQL
│   └── stages_export.sql
└── README.md
```

## 🔄 Workflow Complet

1. **Entreprise** publie une offre de stage
2. **Étudiant** recherche et postule avec CV + lettre
3. **Entreprise** accepte/refuse avec feedback
4. **Convention** générée automatiquement si acceptée
5. **Enseignant** valide la convention
6. **Admin** supervise le processus global

## 📈 Fonctionnalités Avancées

- **Recherche full-text** dans les offres
- **Filtrage avancé** par domaine, durée, localisation
- **Notifications temps réel** via WebSocket
- **Export Excel** des statistiques
- **Génération PDF** des conventions
- **Messagerie intégrée** étudiant ↔ entreprise
- **Tableau de bord analytique** pour chaque rôle
- **Validation en cascade** des processus
- **Alertes automatiques** par email

## 🔧 Configuration

### Variables d'environnement
```yaml
# Base de données
spring.datasource.url=jdbc:postgresql://localhost:5432/gestion_stages
spring.datasource.username=postgres
spring.datasource.password=password

# JWT
jwt.secret=mySecretKey
jwt.expiration=86400000

# Email
spring.mail.host=smtp.gmail.com
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

Le système offre une solution complète de gestion de stages avec une expérience utilisateur optimisée pour chaque type d'acteur (étudiant, entreprise, enseignant, admin).