package com.gestionstages.dto;

import com.gestionstages.entity.User;

public class AuthResponse {
    private String token;
    private UserDto user;
    
    public AuthResponse() {}
    
    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = new UserDto(user);
    }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
    
    public static class UserDto {
        private Long id;
        private String email;
        private String nom;
        private String prenom;
        private String role;
        
        public UserDto(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.nom = user.getNom();
            this.prenom = user.getPrenom();
            this.role = user.getRole().name();
        }
        
        // Getters et Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getNom() { return nom; }
        public void setNom(String nom) { this.nom = nom; }
        
        public String getPrenom() { return prenom; }
        public void setPrenom(String prenom) { this.prenom = prenom; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
}