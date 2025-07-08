package com.gestionstages.service;

import com.gestionstages.entity.*;
import com.gestionstages.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CandidatureService {
    
    @Autowired
    private CandidatureRepository candidatureRepository;
    
    @Autowired
    private OffreService offreService;
    
    @Autowired
    private UserRepository userRepository;
    
    public Candidature postuler(Long offreId, Candidature candidature, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        if (!(user instanceof Etudiant)) {
            throw new RuntimeException("Seuls les étudiants peuvent postuler");
        }
        
        Offre offre = offreService.getOffreEntityById(offreId);
        
        if (candidatureRepository.existsByOffreIdAndEtudiantId(offreId, user.getId())) {
            throw new RuntimeException("Candidature déjà envoyée pour cette offre");
        }
        
        candidature.setOffre(offre);
        candidature.setEtudiant((Etudiant) user);
        
        return candidatureRepository.save(candidature);
    }
    
    public List<Candidature> getCandidaturesByEtudiant(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        return candidatureRepository.findByEtudiantId(user.getId());
    }
    
    public List<Candidature> getCandidaturesByEntreprise(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        return candidatureRepository.findByOffreEntrepriseId(user.getId());
    }
    
    public Candidature updateStatut(Long candidatureId, String statut, String feedback, String userEmail) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new RuntimeException("Candidature non trouvée"));
        
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        if (!candidature.getOffre().getEntreprise().getId().equals(user.getId())) {
            throw new RuntimeException("Non autorisé à modifier cette candidature");
        }
        
        candidature.setStatut(CandidatureStatut.valueOf(statut));
        if (feedback != null) {
            candidature.setFeedback(feedback);
        }
        
        return candidatureRepository.save(candidature);
    }
}