CREATE TABLE `laundry_laundryshop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `information` longtext NOT NULL,
  `operating_time` json NOT NULL,
  `min_price` int unsigned NOT NULL,
  `grade` decimal(2,1) NOT NULL,
  `profile_id` int NOT NULL,
  `delivery_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profile_id` (`profile_id`),
  CONSTRAINT `laundry_laundryshop_profile_id_550b0a10_fk_myauth_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `myauth_profile` (`id`),
  CONSTRAINT `laundry_laundryshop_chk_1` CHECK ((`min_price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
