package com.gestionstages.repository;

import com.gestionstages.entity.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findByEtudiantId(Long etudiantId);
    List<Candidature> findByOffreId(Long offreId);
    List<Candidature> findByOffreEntrepriseId(Long entrepriseId);
    boolean existsByOffreIdAndEtudiantId(Long offreId, Long etudiantId);
}