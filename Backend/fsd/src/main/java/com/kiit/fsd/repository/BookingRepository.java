package com.kiit.fsd.repository;

import com.kiit.fsd.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	 List<Booking> findByUserId(Long userId);
	 List<Booking> findByCarIdAndStatus(Long carId, String status);
}
