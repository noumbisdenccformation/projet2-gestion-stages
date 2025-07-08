package com.gestionstages.controller;

import com.gestionstages.entity.Offre;
import com.gestionstages.dto.OffreDto;
import com.gestionstages.service.OffreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/offres")
@CrossOrigin(origins = "http://localhost:4200")
public class OffreController {
    
    @Autowired
    private OffreService offreService;
    
    @GetMapping
    public ResponseEntity<List<OffreDto>> getOffres(
            @RequestParam(required = false) String domaine,
            @RequestParam(required = false) Integer duree,
            @RequestParam(required = false) String localisation) {
        
        List<OffreDto> offres = offreService.getOffresWithFilters(domaine, duree, localisation);
        return ResponseEntity.ok(offres);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<OffreDto> getOffre(@PathVariable Long id) {
        OffreDto offre = offreService.getOffreById(id);
        return ResponseEntity.ok(offre);
    }
    
    @PostMapping
    public ResponseEntity<Offre> createOffre(@RequestBody Offre offre, Authentication auth) {
        Offre createdOffre = offreService.createOffre(offre, auth.getName());
        return ResponseEntity.ok(createdOffre);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Offre> updateOffre(@PathVariable Long id, @RequestBody Offre offre, Authentication auth) {
        Offre updatedOffre = offreService.updateOffre(id, offre, auth.getName());
        return ResponseEntity.ok(updatedOffre);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffre(@PathVariable Long id, Authentication auth) {
        offreService.deleteOffre(id, auth.getName());
        return ResponseEntity.ok().build();
    }
}