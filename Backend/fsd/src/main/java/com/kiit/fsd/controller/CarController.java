package com.kiit.fsd.controller;


import com.kiit.fsd.dto.CarResponse;
import com.kiit.fsd.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
@RestController
@RequestMapping("/api/cars")


public class CarController {
	 private final CarService carService;
	 
	    public CarController(CarService carService) {
	        this.carService = carService;
	    }
	 
	    @GetMapping
	    public ResponseEntity<List<CarResponse>> getCars(
	            @RequestParam(required = false, defaultValue = "false") boolean available) {
	        List<CarResponse> cars = available
	                ? carService.getAvailableCars()
	                : carService.getAllCars();
	        return ResponseEntity.ok(cars);
	    }
	 
	    @GetMapping("/{id}")
	    public ResponseEntity<CarResponse> getCar(@PathVariable Long id) {
	        return ResponseEntity.ok(carService.getCarById(id));
	    }
}
