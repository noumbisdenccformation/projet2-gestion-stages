package com.gestionstages.controller;

import com.gestionstages.entity.Candidature;
import com.gestionstages.service.CandidatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/candidatures")
@CrossOrigin(origins = "http://localhost:4200")
public class CandidatureController {
    
    @Autowired
    private CandidatureService candidatureService;
    
    @PostMapping("/offre/{offreId}")
    public ResponseEntity<Candidature> postuler(@PathVariable Long offreId, 
                                              @RequestBody Candidature candidature,
                                              Authentication auth) {
        Candidature created = candidatureService.postuler(offreId, candidature, auth.getName());
        return ResponseEntity.ok(created);
    }
    
    @GetMapping("/mes-candidatures")
    public ResponseEntity<List<Candidature>> getMesCandidatures(Authentication auth) {
        List<Candidature> candidatures = candidatureService.getCandidaturesByEtudiant(auth.getName());
        return ResponseEntity.ok(candidatures);
    }
    
    @GetMapping("/entreprise")
    public ResponseEntity<List<Candidature>> getCandidaturesEntreprise(Authentication auth) {
        List<Candidature> candidatures = candidatureService.getCandidaturesByEntreprise(auth.getName());
        return ResponseEntity.ok(candidatures);
    }
    
    @PutMapping("/{id}/statut")
    public ResponseEntity<Candidature> updateStatut(@PathVariable Long id,
                                                   @RequestParam String statut,
                                                   @RequestParam(required = false) String feedback,
                                                   Authentication auth) {
        Candidature updated = candidatureService.updateStatut(id, statut, feedback, auth.getName());
        return ResponseEntity.ok(updated);
    }
}