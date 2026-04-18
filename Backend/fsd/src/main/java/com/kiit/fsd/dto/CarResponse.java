package com.kiit.fsd.dto;


import lombok.*;

@Data @Builder @NoArgsConstructor @AllArgsConstructor

public class CarResponse {
    private Long    id;
    private String  name;
    private String  brand;
    private String  model;
    private Integer year;
    private Double  pricePerDay;
    private Boolean available;
    private String  imageUrl;
}
