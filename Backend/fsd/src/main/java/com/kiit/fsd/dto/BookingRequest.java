package com.kiit.fsd.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
 
@Data @NoArgsConstructor @AllArgsConstructor

public class BookingRequest {
	
	@NotNull(message = "Car ID is required")
    private Long carId;
 
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
 
    @NotNull(message = "End date is required")
    private LocalDate endDate;
}
