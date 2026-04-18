package com.kiit.fsd.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
 
@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
   
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
 
   
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;
 
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
 
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;
 
    @Column(name = "total_price", nullable = false)
    private Double totalPrice;
 
   
    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "CONFIRMED";
 
    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
 
    public void calculateTotalPrice() {
        if (startDate != null && endDate != null && car != null) {
            long days = ChronoUnit.DAYS.between(startDate, endDate);
            if (days < 1) days = 1;
            this.totalPrice = days * car.getPricePerDay();
        }
    }
}
