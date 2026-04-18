
CREATE DATABASE IF NOT EXISTS car_rental_db;
USE car_rental_db;
 
INSERT IGNORE INTO cars (id, name, brand, model, year, price_per_day, available, image_url) VALUES
(1, 'Swift Dezire', 'Maruti Suzuki', 'Dezire', 2022, 1200.00, true, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'),
(2, 'Honda City', 'Honda', 'City', 2023, 1800.00, true, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400'),
(3, 'Hyundai Creta', 'Hyundai', 'Creta', 2023, 2200.00, true, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400'),
(4, 'Toyota Innova', 'Toyota', 'Innova Crysta', 2022, 2800.00, true, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'),
(5, 'Tata Nexon EV', 'Tata', 'Nexon EV', 2023, 2500.00, true, 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400'),
(6, 'Kia Seltos', 'Kia', 'Seltos', 2023, 2000.00, false, 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=400');
 