package com.gestionstages.service;

import com.gestionstages.entity.Candidature;
import com.gestionstages.entity.Convention;
import com.gestionstages.repository.ConventionRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ConventionService {

    @Autowired
    private ConventionRepository conventionRepository;

    public List<Convention> getConventionsByEnseignant(Long enseignantId) {
        return conventionRepository.findByEnseignantIdAndStatut(enseignantId, Convention.StatutConvention.EN_ATTENTE);
    }

    public List<Convention> getAllConventions() {
        return conventionRepository.findAll();
    }

    public Convention validerConvention(Long conventionId, String commentaire) {
        Convention convention = conventionRepository.findById(conventionId)
                .orElseThrow(() -> new RuntimeException("Convention non trouvée"));
        
        convention.setStatut(Convention.StatutConvention.VALIDEE);
        convention.setCommentaireEnseignant(commentaire);
        convention.setDateValidation(LocalDateTime.now());
        
        return conventionRepository.save(convention);
    }

    public Convention rejeterConvention(Long conventionId, String motif) {
        Convention convention = conventionRepository.findById(conventionId)
                .orElseThrow(() -> new RuntimeException("Convention non trouvée"));
        
        convention.setStatut(Convention.StatutConvention.REJETEE);
        convention.setCommentaireEnseignant(motif);
        convention.setDateValidation(LocalDateTime.now());
        
        return conventionRepository.save(convention);
    }

    public byte[] genererConventionPDF(Candidature candidature) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
                contentStream.beginText();
                contentStream.setLeading(20f);
                contentStream.newLineAtOffset(50, 750);
                
                contentStream.showText("CONVENTION DE STAGE");
                contentStream.newLine();
                contentStream.newLine();
                
                contentStream.setFont(PDType1Font.HELVETICA, 12);
                contentStream.showText("Date de génération: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
                contentStream.newLine();
                contentStream.newLine();
                
                contentStream.showText("ÉTUDIANT:");
                contentStream.newLine();
                contentStream.showText("Nom: " + candidature.getEtudiant().getUser().getLastName());
                contentStream.newLine();
                contentStream.showText("Prénom: " + candidature.getEtudiant().getUser().getFirstName());
                contentStream.newLine();
                contentStream.showText("Email: " + candidature.getEtudiant().getUser().getEmail());
                contentStream.newLine();
                contentStream.showText("Filière: " + candidature.getEtudiant().getFiliere());
                contentStream.newLine();
                contentStream.showText("Niveau: " + candidature.getEtudiant().getNiveau());
                contentStream.newLine();
                contentStream.newLine();
                
                contentStream.showText("ENTREPRISE:");
                contentStream.newLine();
                contentStream.showText("Nom: " + candidature.getOffre().getEntreprise().getNomEntreprise());
                contentStream.newLine();
                contentStream.showText("Secteur: " + candidature.getOffre().getEntreprise().getSecteur());
                contentStream.newLine();
                contentStream.showText("Adresse: " + candidature.getOffre().getEntreprise().getAdresse());
                contentStream.newLine();
                contentStream.newLine();
                
                contentStream.showText("STAGE:");
                contentStream.newLine();
                contentStream.showText("Titre: " + candidature.getOffre().getTitre());
                contentStream.newLine();
                contentStream.showText("Domaine: " + candidature.getOffre().getDomaine());
                contentStream.newLine();
                contentStream.showText("Durée: " + candidature.getOffre().getDureeMois() + " mois");
                contentStream.newLine();
                contentStream.showText("Localisation: " + candidature.getOffre().getLocalisation());
                contentStream.newLine();
                contentStream.showText("Date de début: " + candidature.getOffre().getDateDebut());
                contentStream.newLine();
                contentStream.showText("Date de fin: " + candidature.getOffre().getDateFin());
                contentStream.newLine();
                
                if (candidature.getOffre().getSalaire() != null) {
                    contentStream.showText("Rémunération: " + candidature.getOffre().getSalaire() + "€/mois");
                    contentStream.newLine();
                }
                
                contentStream.newLine();
                contentStream.showText("Compétences requises: " + candidature.getOffre().getCompetencesRequises());
                contentStream.newLine();
                contentStream.newLine();
                
                contentStream.showText("Description du stage:");
                contentStream.newLine();
                
                // Découper la description en lignes pour éviter le débordement
                String description = candidature.getOffre().getDescription();
                String[] mots = description.split(" ");
                StringBuilder ligne = new StringBuilder();
                
                for (String mot : mots) {
                    if (ligne.length() + mot.length() > 80) {
                        contentStream.showText(ligne.toString());
                        contentStream.newLine();
                        ligne = new StringBuilder(mot + " ");
                    } else {
                        ligne.append(mot).append(" ");
                    }
                }
                
                if (ligne.length() > 0) {
                    contentStream.showText(ligne.toString());
                    contentStream.newLine();
                }
                
                contentStream.newLine();
                contentStream.newLine();
                contentStream.showText("Signatures:");
                contentStream.newLine();
                contentStream.newLine();
                contentStream.showText("Étudiant: ________________________    Date: ____________");
                contentStream.newLine();
                contentStream.newLine();
                contentStream.showText("Entreprise: ______________________    Date: ____________");
                contentStream.newLine();
                contentStream.newLine();
                contentStream.showText("Enseignant: ______________________    Date: ____________");
                
                contentStream.endText();
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
    }

    public Convention creerConvention(Candidature candidature) {
        Convention convention = new Convention();
        convention.setCandidature(candidature);
        convention.setStatut(Convention.StatutConvention.EN_ATTENTE);
        convention.setDateCreation(LocalDateTime.now());
        
        return conventionRepository.save(convention);
    }
}