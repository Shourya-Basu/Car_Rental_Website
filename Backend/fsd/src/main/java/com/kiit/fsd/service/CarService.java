package com.kiit.fsd.service;

import com.kiit.fsd.dto.CarResponse;
import com.kiit.fsd.entity.Car;
import com.kiit.fsd.repository.CarRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
 
import java.util.List;
import java.util.stream.Collectors;
 
@Service

public class CarService {
	  private final CarRepository carRepository;
	  
	    public CarService(CarRepository carRepository) {
	        this.carRepository = carRepository;
	    }
	 
	    /** Return all cars (both available and unavailable). */
	    public List<CarResponse> getAllCars() {
	        return carRepository.findAll()
	                .stream()
	                .map(this::toResponse)
	                .collect(Collectors.toList());
	    }
	 
	    /** Return only available cars. */
	    public List<CarResponse> getAvailableCars() {
	        return carRepository.findByAvailableTrue()
	                .stream()
	                .map(this::toResponse)
	                .collect(Collectors.toList());
	    }
	 
	    /** Return single car by ID. */
	    public CarResponse getCarById(Long id) {
	        Car car = carRepository.findById(id)
	                .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.NOT_FOUND, "Car not found with id: " + id));
	        return toResponse(car);
	    }
	 
	    /** Map Car entity → CarResponse DTO. */
	    public CarResponse toResponse(Car car) {
	        return CarResponse.builder()
	                .id(car.getId())
	                .name(car.getName())
	                .brand(car.getBrand())
	                .model(car.getModel())
	                .year(car.getYear())
	                .pricePerDay(car.getPricePerDay())
	                .available(car.getAvailable())
	                .imageUrl(car.getImageUrl())
	                .build();
	    }
}
