package com.gestionstages.controller;

import com.gestionstages.entity.Convention;
import com.gestionstages.service.ConventionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conventions")
@Tag(name = "Conventions", description = "API de gestion des conventions de stage")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ConventionController {

    @Autowired
    private ConventionService conventionService;

    @GetMapping("/enseignant/{enseignantId}")
    @PreAuthorize("hasRole('ENSEIGNANT') or hasRole('ADMIN')")
    @Operation(summary = "Obtenir les conventions à valider pour un enseignant")
    public ResponseEntity<List<Convention>> getConventionsByEnseignant(@PathVariable Long enseignantId) {
        List<Convention> conventions = conventionService.getConventionsByEnseignant(enseignantId);
        return ResponseEntity.ok(conventions);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Obtenir toutes les conventions (admin)")
    public ResponseEntity<List<Convention>> getAllConventions() {
        List<Convention> conventions = conventionService.getAllConventions();
        return ResponseEntity.ok(conventions);
    }

    @PostMapping("/{conventionId}/valider")
    @PreAuthorize("hasRole('ENSEIGNANT') or hasRole('ADMIN')")
    @Operation(summary = "Valider une convention")
    public ResponseEntity<Convention> validerConvention(
            @PathVariable Long conventionId,
            @RequestParam(required = false) String commentaire) {
        Convention convention = conventionService.validerConvention(conventionId, commentaire);
        return ResponseEntity.ok(convention);
    }

    @PostMapping("/{conventionId}/rejeter")
    @PreAuthorize("hasRole('ENSEIGNANT') or hasRole('ADMIN')")
    @Operation(summary = "Rejeter une convention")
    public ResponseEntity<Convention> rejeterConvention(
            @PathVariable Long conventionId,
            @RequestParam String motif) {
        Convention convention = conventionService.rejeterConvention(conventionId, motif);
        return ResponseEntity.ok(convention);
    }

    @GetMapping("/{conventionId}/pdf")
    @PreAuthorize("hasRole('ENSEIGNANT') or hasRole('ADMIN') or hasRole('ENTREPRISE') or hasRole('ETUDIANT')")
    @Operation(summary = "Télécharger le PDF d'une convention")
    public ResponseEntity<byte[]> telechargerConventionPDF(@PathVariable Long conventionId) {
        try {
            // Ici, vous devriez récupérer la convention et générer/récupérer le PDF
            // Pour l'exemple, on retourne un PDF vide
            byte[] pdfContent = new byte[0]; // À remplacer par le vrai contenu PDF
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "convention_" + conventionId + ".pdf");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfContent);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}