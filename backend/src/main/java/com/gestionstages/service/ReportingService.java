package com.gestionstages.service;

import com.gestionstages.entity.Candidature;
import com.gestionstages.entity.CandidatureStatut;
import com.gestionstages.entity.Offre;
import com.gestionstages.entity.OffreStatut;
import com.gestionstages.repository.CandidatureRepository;
import com.gestionstages.repository.OffreRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportingService {

    @Autowired
    private OffreRepository offreRepository;

    @Autowired
    private CandidatureRepository candidatureRepository;

    public byte[] exporterStagesParFiliere() throws IOException {
        List<Offre> offres = offreRepository.findAll();
        
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Stages par Filière");
            
            // Style pour l'en-tête
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            
            // Créer l'en-tête
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Titre", "Entreprise", "Domaine", "Localisation", "Durée (mois)", 
                               "Salaire", "Date début", "Date fin", "Statut", "Nb Candidatures"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }
            
            // Remplir les données
            int rowNum = 1;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            
            for (Offre offre : offres) {
                Row row = sheet.createRow(rowNum++);
                
                row.createCell(0).setCellValue(offre.getTitre());
                row.createCell(1).setCellValue(offre.getEntreprise().getNomEntreprise());
                row.createCell(2).setCellValue(offre.getDomaine());
                row.createCell(3).setCellValue(offre.getLocalisation());
                row.createCell(4).setCellValue(offre.getDureeMois());
                row.createCell(5).setCellValue(offre.getSalaire() != null ? offre.getSalaire().doubleValue() : 0);
                row.createCell(6).setCellValue(offre.getDateDebut().format(formatter));
                row.createCell(7).setCellValue(offre.getDateFin().format(formatter));
                row.createCell(8).setCellValue(offre.getStatut().toString());
                row.createCell(9).setCellValue(offre.getCandidatures().size());
            }
            
            // Ajuster la largeur des colonnes
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }
            
            // Ajouter une feuille de statistiques
            Sheet statsSheet = workbook.createSheet("Statistiques");
            createStatisticsSheet(statsSheet, workbook);
            
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            workbook.write(baos);
            return baos.toByteArray();
        }
    }

    private void createStatisticsSheet(Sheet sheet, Workbook workbook) {
        // Style pour les titres
        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 14);
        titleStyle.setFont(titleFont);
        
        int rowNum = 0;
        
        // Statistiques par domaine
        Row titleRow = sheet.createRow(rowNum++);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("Statistiques par Domaine");
        titleCell.setCellStyle(titleStyle);
        
        rowNum++; // Ligne vide
        
        Map<String, Long> statsByDomain = getStatistiquesByDomaine();
        Row headerRow = sheet.createRow(rowNum++);
        headerRow.createCell(0).setCellValue("Domaine");
        headerRow.createCell(1).setCellValue("Nombre d'offres");
        
        for (Map.Entry<String, Long> entry : statsByDomain.entrySet()) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(entry.getKey());
            row.createCell(1).setCellValue(entry.getValue());
        }
        
        rowNum += 2; // Lignes vides
        
        // Statistiques par statut de candidature
        Row titleRow2 = sheet.createRow(rowNum++);
        Cell titleCell2 = titleRow2.createCell(0);
        titleCell2.setCellValue("Statistiques des Candidatures");
        titleCell2.setCellStyle(titleStyle);
        
        rowNum++; // Ligne vide
        
        Map<String, Long> statsByStatus = getStatistiquesByStatutCandidature();
        Row headerRow2 = sheet.createRow(rowNum++);
        headerRow2.createCell(0).setCellValue("Statut");
        headerRow2.createCell(1).setCellValue("Nombre");
        
        for (Map.Entry<String, Long> entry : statsByStatus.entrySet()) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(entry.getKey());
            row.createCell(1).setCellValue(entry.getValue());
        }
        
        // Ajuster la largeur des colonnes
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public Map<String, Long> getStatistiquesByDomaine() {
        List<Object[]> results = offreRepository.countByDomaine();
        Map<String, Long> stats = new HashMap<>();
        
        for (Object[] result : results) {
            stats.put((String) result[0], (Long) result[1]);
        }
        
        return stats;
    }

    public Map<String, Long> getStatistiquesByStatutCandidature() {
        List<Object[]> results = candidatureRepository.countByStatut();
        Map<String, Long> stats = new HashMap<>();
        
        for (Object[] result : results) {
            stats.put(result[0].toString(), (Long) result[1]);
        }
        
        return stats;
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalOffres", offreRepository.count());
        stats.put("offresActives", offreRepository.findAll().stream().filter(o -> o.getStatut() == OffreStatut.ACTIVE).count());
        stats.put("totalCandidatures", candidatureRepository.count());
        stats.put("candidaturesAcceptees", candidatureRepository.findAll().stream().filter(c -> c.getStatut() == CandidatureStatut.ACCEPTEE).count());
        stats.put("candidaturesEnAttente", candidatureRepository.findAll().stream().filter(c -> c.getStatut() == CandidatureStatut.EN_ATTENTE).count());
        stats.put("candidaturesRefusees", candidatureRepository.findAll().stream().filter(c -> c.getStatut() == CandidatureStatut.REFUSEE).count());
        
        stats.put("statsByDomaine", getStatistiquesByDomaine());
        stats.put("statsByStatut", getStatistiquesByStatutCandidature());
        
        return stats;
    }
}