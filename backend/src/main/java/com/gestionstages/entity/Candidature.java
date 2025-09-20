package com.gestionstages.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "candidatures")
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "offre_id", nullable = false)
    private Offre offre;
    
    @ManyToOne
    @JoinColumn(name = "etudiant_id", nullable = false)
    private Etudiant etudiant;
    
    @Column(columnDefinition = "TEXT")
    private String lettreMotivation;
    
    private String cvPath;
    
    @Enumerated(EnumType.STRING)
    private CandidatureStatut statut = CandidatureStatut.EN_ATTENTE;
    
    @Column(name = "date_postulation")
    private LocalDateTime datePostulation = LocalDateTime.now();
    
    private String feedback;
    
    // Constructeurs
    public Candidature() {}
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Offre getOffre() { return offre; }
    public void setOffre(Offre offre) { this.offre = offre; }
    
    public Etudiant getEtudiant() { return etudiant; }
    public void setEtudiant(Etudiant etudiant) { this.etudiant = etudiant; }
    
    public String getLettreMotivation() { return lettreMotivation; }
    public void setLettreMotivation(String lettreMotivation) { this.lettreMotivation = lettreMotivation; }
    
    public String getCvPath() { return cvPath; }
    public void setCvPath(String cvPath) { this.cvPath = cvPath; }
    
    public CandidatureStatut getStatut() { return statut; }
    public void setStatut(CandidatureStatut statut) { this.statut = statut; }
    
    public LocalDateTime getDatePostulation() { return datePostulation; }
    public void setDatePostulation(LocalDateTime datePostulation) { this.datePostulation = datePostulation; }
    
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
}

