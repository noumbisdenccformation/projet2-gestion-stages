package com.gestionstages.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "etudiants")
public class Etudiant extends User {
    
    @Column(nullable = false)
    private String filiere;
    
    @Column(nullable = false)
    private String niveau;
    
    private String cv;
    
    public Etudiant() {
        super();
        setRole(Role.ETUDIANT);
    }
    
    public Etudiant(String email, String password, String nom, String prenom, String filiere, String niveau) {
        super(email, password, nom, prenom, Role.ETUDIANT);
        this.filiere = filiere;
        this.niveau = niveau;
    }
    
    // Getters et Setters
    public String getFiliere() { return filiere; }
    public void setFiliere(String filiere) { this.filiere = filiere; }
    
    public String getNiveau() { return niveau; }
    public void setNiveau(String niveau) { this.niveau = niveau; }
    
    public String getCv() { return cv; }
    public void setCv(String cv) { this.cv = cv; }
}