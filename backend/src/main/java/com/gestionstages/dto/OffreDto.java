package com.gestionstages.dto;

import com.gestionstages.entity.Offre;
import java.time.LocalDateTime;
import java.util.List;

public class OffreDto {
    private Long id;
    private String titre;
    private String description;
    private Long entrepriseId;
    private String entrepriseNom;
    private String secteur;
    private String domaine;
    private Integer duree;
    private String localisation;
    private List<String> competencesRequises;
    private LocalDateTime datePublication;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private String statut;
    private Double salaire;
    
    public OffreDto() {}
    
    public OffreDto(Offre offre) {
        this.id = offre.getId();
        this.titre = offre.getTitre();
        this.description = offre.getDescription();
        this.entrepriseId = offre.getEntreprise().getId();
        this.entrepriseNom = offre.getEntreprise().getNomEntreprise();
        this.secteur = offre.getSecteur();
        this.domaine = offre.getDomaine();
        this.duree = offre.getDuree();
        this.localisation = offre.getLocalisation();
        this.competencesRequises = offre.getCompetencesRequises();
        this.datePublication = offre.getDatePublication();
        this.dateDebut = offre.getDateDebut();
        this.dateFin = offre.getDateFin();
        this.statut = offre.getStatut().name();
        this.salaire = offre.getSalaire();
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Long getEntrepriseId() { return entrepriseId; }
    public void setEntrepriseId(Long entrepriseId) { this.entrepriseId = entrepriseId; }
    
    public String getEntrepriseNom() { return entrepriseNom; }
    public void setEntrepriseNom(String entrepriseNom) { this.entrepriseNom = entrepriseNom; }
    
    public String getSecteur() { return secteur; }
    public void setSecteur(String secteur) { this.secteur = secteur; }
    
    public String getDomaine() { return domaine; }
    public void setDomaine(String domaine) { this.domaine = domaine; }
    
    public Integer getDuree() { return duree; }
    public void setDuree(Integer duree) { this.duree = duree; }
    
    public String getLocalisation() { return localisation; }
    public void setLocalisation(String localisation) { this.localisation = localisation; }
    
    public List<String> getCompetencesRequises() { return competencesRequises; }
    public void setCompetencesRequises(List<String> competencesRequises) { this.competencesRequises = competencesRequises; }
    
    public LocalDateTime getDatePublication() { return datePublication; }
    public void setDatePublication(LocalDateTime datePublication) { this.datePublication = datePublication; }
    
    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }
    
    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }
    
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    
    public Double getSalaire() { return salaire; }
    public void setSalaire(Double salaire) { this.salaire = salaire; }
}