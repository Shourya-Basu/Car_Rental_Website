package com.kiit.fsd.entity;

import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false, length = 100)
    private String name;
 
    @Column(nullable = false, length = 100)
    private String brand;
 
    @Column(nullable = false, length = 100)
    private String model;
 
    @Column(nullable = false)
    private Integer year;
 
    @Column(name = "price_per_day", nullable = false)
    private Double pricePerDay;
 
    @Column(nullable = false)
    @Builder.Default
    private Boolean available = true;
 
    @Column(name = "image_url", length = 500)
    private String imageUrl;
}
