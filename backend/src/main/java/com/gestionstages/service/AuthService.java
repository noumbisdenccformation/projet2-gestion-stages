package com.gestionstages.service;

import com.gestionstages.dto.*;
import com.gestionstages.entity.*;
import com.gestionstages.repository.UserRepository;
import com.gestionstages.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public AuthResponse authenticate(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user);
    }
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }
        
        User user = createUserByRole(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        user = userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user);
    }
    
    private User createUserByRole(RegisterRequest request) {
        return switch (request.getRole()) {
            case "ETUDIANT" -> new Etudiant(
                request.getEmail(), request.getPassword(), 
                request.getNom(), request.getPrenom(),
                request.getFiliere(), request.getNiveau()
            );
            case "ENTREPRISE" -> new Entreprise(
                request.getEmail(), request.getPassword(),
                request.getNom(), request.getPrenom(),
                request.getNomEntreprise(), request.getSecteur()
            );
            case "ENSEIGNANT" -> new Enseignant(
                request.getEmail(), request.getPassword(),
                request.getNom(), request.getPrenom(),
                request.getDepartement(), request.getSpecialite()
            );
            default -> throw new RuntimeException("Rôle invalide");
        };
    }
}