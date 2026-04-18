package com.kiit.fsd.service;

import com.kiit.fsd.dto.BookingRequest;
import com.kiit.fsd.dto.BookingResponse;
import com.kiit.fsd.entity.Booking;
import com.kiit.fsd.entity.Car;
import com.kiit.fsd.entity.User;
import com.kiit.fsd.repository.BookingRepository;
import com.kiit.fsd.repository.CarRepository;
import com.kiit.fsd.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
 
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
 
@Service

public class BookingService {
	 private final BookingRepository bookingRepository;
	    private final CarRepository carRepository;
	    private final UserRepository userRepository;
	    private final CarService carService;
	 
	    public BookingService(BookingRepository bookingRepository,
	                          CarRepository carRepository,
	                          UserRepository userRepository,
	                          CarService carService) {
	        this.bookingRepository = bookingRepository;
	        this.carRepository     = carRepository;
	        this.userRepository    = userRepository;
	        this.carService        = carService;
	    }
	 
	    @Transactional
	    public BookingResponse createBooking(BookingRequest request, String userEmail) {
	        
	        User user = userRepository.findByEmail(userEmail)
	                .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.UNAUTHORIZED, "User not found"));
	 
	      
	        Car car = carRepository.findById(request.getCarId())
	                .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.NOT_FOUND, "Car not found with id: " + request.getCarId()));
	 
	   
	        if (!request.getEndDate().isAfter(request.getStartDate())) {
	            throw new ResponseStatusException(
	                HttpStatus.BAD_REQUEST, "End date must be after start date");
	        }
	        if (request.getStartDate().isBefore(LocalDate.now())) {
	            throw new ResponseStatusException(
	                HttpStatus.BAD_REQUEST, "Start date cannot be in the past");
	        }
	 

	        if (!car.getAvailable()) {
	            throw new ResponseStatusException(
	                HttpStatus.CONFLICT, "Car is not available for booking");
	        }

	        Booking booking = Booking.builder()
	                .user(user)
	                .car(car)
	                .startDate(request.getStartDate())
	                .endDate(request.getEndDate())
	                .status("CONFIRMED")
	                .build();
	        booking.calculateTotalPrice();
	        bookingRepository.save(booking);
	 
	     
	        car.setAvailable(false);
	        carRepository.save(car);
	 
	        return toResponse(booking);
	    }
	 
	
	    public List<BookingResponse> getUserBookings(String userEmail) {
	        User user = userRepository.findByEmail(userEmail)
	                .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.UNAUTHORIZED, "User not found"));
	 
	        return bookingRepository.findByUserId(user.getId())
	                .stream()
	                .map(this::toResponse)
	                .collect(Collectors.toList());
	    }
	 

	    @Transactional
	    public BookingResponse cancelBooking(Long bookingId, String userEmail) {
	        Booking booking = bookingRepository.findById(bookingId)
	                .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.NOT_FOUND, "Booking not found"));
	 
	        if (!booking.getUser().getEmail().equals(userEmail)) {
	            throw new ResponseStatusException(
	                HttpStatus.FORBIDDEN, "You can only cancel your own bookings");
	        }
	 
	        if ("CANCELLED".equals(booking.getStatus())) {
	            throw new ResponseStatusException(
	                HttpStatus.BAD_REQUEST, "Booking is already cancelled");
	        }
	 
	        booking.setStatus("CANCELLED");
	        bookingRepository.save(booking);
	        
	        Car car = booking.getCar();
	        car.setAvailable(true);
	        carRepository.save(car);
	 
	        return toResponse(booking);
	    }
	 
	    private BookingResponse toResponse(Booking booking) {
	        return BookingResponse.builder()
	                .id(booking.getId())
	                .car(carService.toResponse(booking.getCar()))
	                .userName(booking.getUser().getName())
	                .startDate(booking.getStartDate())
	                .endDate(booking.getEndDate())
	                .totalPrice(booking.getTotalPrice())
	                .status(booking.getStatus())
	                .createdAt(booking.getCreatedAt())
	                .build();
	    }
}
