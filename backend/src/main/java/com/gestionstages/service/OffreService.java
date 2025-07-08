package com.gestionstages.service;

import com.gestionstages.entity.*;
import com.gestionstages.dto.OffreDto;
import com.gestionstages.repository.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OffreService {
    
    @Autowired
    private OffreRepository offreRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<OffreDto> getOffresWithFilters(String domaine, Integer duree, String localisation) {
        return offreRepository.findWithFilters(domaine, duree, localisation)
                .stream()
                .map(OffreDto::new)
                .collect(Collectors.toList());
    }
    
    public OffreDto getOffreById(Long id) {
        Offre offre = offreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offre non trouvée"));
        return new OffreDto(offre);
    }
    
    public Offre getOffreEntityById(Long id) {
        return offreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offre non trouvée"));
    }
    
    public Offre createOffre(Offre offre, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        if (!(user instanceof Entreprise)) {
            throw new RuntimeException("Seules les entreprises peuvent créer des offres");
        }
        
        offre.setEntreprise((Entreprise) user);
        return offreRepository.save(offre);
    }
    
    public Offre updateOffre(Long id, Offre offreData, String userEmail) {
        Offre offre = getOffreById(id);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        if (!offre.getEntreprise().getId().equals(user.getId())) {
            throw new RuntimeException("Non autorisé à modifier cette offre");
        }
        
        offre.setTitre(offreData.getTitre());
        offre.setDescription(offreData.getDescription());
        offre.setDomaine(offreData.getDomaine());
        offre.setDuree(offreData.getDuree());
        offre.setLocalisation(offreData.getLocalisation());
        offre.setCompetencesRequises(offreData.getCompetencesRequises());
        offre.setDateDebut(offreData.getDateDebut());
        offre.setDateFin(offreData.getDateFin());
        
        return offreRepository.save(offre);
    }
    
    public void deleteOffre(Long id, String userEmail) {
        Offre offre = getOffreById(id);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        if (!offre.getEntreprise().getId().equals(user.getId())) {
            throw new RuntimeException("Non autorisé à supprimer cette offre");
        }
        
        offreRepository.delete(offre);
    }
}