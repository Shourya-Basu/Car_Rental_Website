package com.kiit.fsd.controller;

import com.kiit.fsd.dto.BookingRequest;
import com.kiit.fsd.dto.BookingResponse;
import com.kiit.fsd.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
@RestController
@RequestMapping("/api/bookings")

public class BookingController {
	private final BookingService bookingService;
	 
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
 
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest request,
            Authentication auth) {
        BookingResponse response = bookingService.createBooking(request, auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
 
    @GetMapping("/my")
    public ResponseEntity<List<BookingResponse>> getMyBookings(Authentication auth) {
        return ResponseEntity.ok(bookingService.getUserBookings(auth.getName()));
    }
 
    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(
            @PathVariable Long id,
            Authentication auth) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, auth.getName()));
    }
}
