package com.kiit.fsd.repository;

import com.kiit.fsd.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long>{
	 List<Car> findByAvailableTrue();
}
