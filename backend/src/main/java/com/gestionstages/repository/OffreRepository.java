package com.gestionstages.repository;

import com.gestionstages.entity.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OffreRepository extends JpaRepository<Offre, Long> {
    List<Offre> findByEntrepriseId(Long entrepriseId);
    
    @Query("SELECT o FROM Offre o WHERE " +
           "(:domaine IS NULL OR o.domaine = :domaine) AND " +
           "(:duree IS NULL OR o.duree = :duree) AND " +
           "(:localisation IS NULL OR LOWER(o.localisation) LIKE LOWER(CONCAT('%', :localisation, '%')))")
    List<Offre> findWithFilters(@Param("domaine") String domaine, 
                               @Param("duree") Integer duree, 
                               @Param("localisation") String localisation);
    
    @Query("SELECT o.domaine, COUNT(o) FROM Offre o GROUP BY o.domaine")
    List<Object[]> countByDomaine();
}