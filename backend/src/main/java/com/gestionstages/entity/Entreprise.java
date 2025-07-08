package com.gestionstages.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "entreprises")
public class Entreprise extends User {
    
    @Column(nullable = false)
    private String nomEntreprise;
    
    @Column(nullable = false)
    private String secteur;
    
    private String siren;
    private String adresseSiege;
    
    public Entreprise() {
        super();
        setRole(Role.ENTREPRISE);
    }
    
    public Entreprise(String email, String password, String nom, String prenom, String nomEntreprise, String secteur) {
        super(email, password, nom, prenom, Role.ENTREPRISE);
        this.nomEntreprise = nomEntreprise;
        this.secteur = secteur;
    }
    
    // Getters et Setters
    public String getNomEntreprise() { return nomEntreprise; }
    public void setNomEntreprise(String nomEntreprise) { this.nomEntreprise = nomEntreprise; }
    
    public String getSecteur() { return secteur; }
    public void setSecteur(String secteur) { this.secteur = secteur; }
    
    public String getSiren() { return siren; }
    public void setSiren(String siren) { this.siren = siren; }
    
    public String getAdresseSiege() { return adresseSiege; }
    public void setAdresseSiege(String adresseSiege) { this.adresseSiege = adresseSiege; }
}