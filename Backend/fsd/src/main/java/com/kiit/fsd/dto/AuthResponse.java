package com.kiit.fsd.dto;

import lombok.*;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long   userId;
    private String name;
    private String email;
    private String role;
}
