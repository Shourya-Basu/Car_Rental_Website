package com.kiit.fsd.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class BookingResponse {
    private Long         id;
    private CarResponse  car;
    private String       userName;
    private LocalDate    startDate;
    private LocalDate    endDate;
    private Double       totalPrice;
    private String       status;
    private LocalDateTime createdAt;
}
