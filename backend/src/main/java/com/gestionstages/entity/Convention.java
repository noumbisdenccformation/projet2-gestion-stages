package com.gestionstages.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "conventions")
public class Convention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "candidature_id", nullable = false)
    private Candidature candidature;

    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private Enseignant enseignant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutConvention statut;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    @Column(name = "date_validation")
    private LocalDateTime dateValidation;

    @Column(name = "commentaire_enseignant", columnDefinition = "TEXT")
    private String commentaireEnseignant;

    @Column(name = "pdf_path")
    private String pdfPath;

    @Column(name = "signature_electronique")
    private Boolean signatureElectronique = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum StatutConvention {
        EN_ATTENTE, VALIDEE, REJETEE, SIGNEE
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructeurs
    public Convention() {}

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Candidature getCandidature() { return candidature; }
    public void setCandidature(Candidature candidature) { this.candidature = candidature; }

    public Enseignant getEnseignant() { return enseignant; }
    public void setEnseignant(Enseignant enseignant) { this.enseignant = enseignant; }

    public StatutConvention getStatut() { return statut; }
    public void setStatut(StatutConvention statut) { this.statut = statut; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateValidation() { return dateValidation; }
    public void setDateValidation(LocalDateTime dateValidation) { this.dateValidation = dateValidation; }

    public String getCommentaireEnseignant() { return commentaireEnseignant; }
    public void setCommentaireEnseignant(String commentaireEnseignant) { this.commentaireEnseignant = commentaireEnseignant; }

    public String getPdfPath() { return pdfPath; }
    public void setPdfPath(String pdfPath) { this.pdfPath = pdfPath; }

    public Boolean getSignatureElectronique() { return signatureElectronique; }
    public void setSignatureElectronique(Boolean signatureElectronique) { this.signatureElectronique = signatureElectronique; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}