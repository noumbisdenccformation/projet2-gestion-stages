package com.gestionstages.repository;

import com.gestionstages.entity.Convention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConventionRepository extends JpaRepository<Convention, Long> {
    
    List<Convention> findByEnseignantIdAndStatut(Long enseignantId, Convention.StatutConvention statut);
    
    List<Convention> findByStatut(Convention.StatutConvention statut);
    
    @Query("SELECT c FROM Convention c WHERE c.candidature.etudiant.id = :etudiantId")
    List<Convention> findByEtudiantId(@Param("etudiantId") Long etudiantId);
    
    @Query("SELECT c FROM Convention c WHERE c.candidature.offre.entreprise.id = :entrepriseId")
    List<Convention> findByEntrepriseId(@Param("entrepriseId") Long entrepriseId);
    
    @Query("SELECT COUNT(c) FROM Convention c WHERE c.statut = :statut")
    Long countByStatut(@Param("statut") Convention.StatutConvention statut);
    
    @Query("SELECT c FROM Convention c WHERE c.enseignant.id = :enseignantId ORDER BY c.dateCreation DESC")
    List<Convention> findByEnseignantIdOrderByDateCreationDesc(@Param("enseignantId") Long enseignantId);
}