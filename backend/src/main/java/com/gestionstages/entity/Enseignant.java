package com.gestionstages.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "enseignants")
public class Enseignant extends User {
    
    @Column(nullable = false)
    private String departement;
    
    @Column(nullable = false)
    private String specialite;
    
    public Enseignant() {
        super();
        setRole(Role.ENSEIGNANT);
    }
    
    public Enseignant(String email, String password, String nom, String prenom, String departement, String specialite) {
        super(email, password, nom, prenom, Role.ENSEIGNANT);
        this.departement = departement;
        this.specialite = specialite;
    }
    
    // Getters et Setters
    public String getDepartement() { return departement; }
    public void setDepartement(String departement) { this.departement = departement; }
    
    public String getSpecialite() { return specialite; }
    public void setSpecialite(String specialite) { this.specialite = specialite; }
}