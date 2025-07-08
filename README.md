# Système de Gestion de Stages - Université

## 🎯 Objectif
Plateforme complète de gestion des stages universitaires avec interfaces dédiées pour étudiants, entreprises, enseignants et administrateurs.

## 🚀 Technologies
- **Frontend**: Angular 17 + Tailwind CSS + PrimeNG
- **Backend**: Spring Boot 3 + PostgreSQL
- **Temps réel**: WebSocket (Socket.IO)
- **Sécurité**: JWT + Spring Security

## 📋 Fonctionnalités

### ✅ Implémentées
- **Authentification** : Login/Register multi-rôles
- **Interface Étudiant** : Recherche d'offres, candidatures, suivi
- **Interface Entreprise** : Publication d'offres, gestion candidatures  
- **Interface Enseignant** : Validation des conventions
- **Interface Admin** : Dashboard, gestion des comptes
- **Messagerie** : Chat temps réel WebSocket

### 🔄 En cours
- Backend Spring Boot (API REST)
- Base de données PostgreSQL
- Génération PDF des conventions

## 🏗️ Structure
```
gestion-stages/
├── frontend/          # Angular 17
│   ├── src/app/
│   │   ├── core/      # Services, guards, models
│   │   ├── features/  # Modules métier
│   │   └── shared/    # Composants partagés
└── backend/           # Spring Boot 3
    └── src/main/java/com/gestionstages/
```

## 🚀 Installation

### Frontend
```bash
cd frontend
npm install
ng serve
```

### Backend  
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## 👥 Rôles Utilisateur
- **ETUDIANT** : Recherche et postule aux stages
- **ENTREPRISE** : Publie des offres et gère les candidatures
- **ENSEIGNANT** : Valide les conventions de stage
- **ADMIN** : Supervise l'ensemble du système