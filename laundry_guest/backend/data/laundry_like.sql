CREATE TABLE `laundry_like` (
  `id` int NOT NULL AUTO_INCREMENT,
  `laundryshop_id` int NOT NULL,
  `profile_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `laundryshop_id` (`laundryshop_id`),
  UNIQUE KEY `profile_id` (`profile_id`),
  CONSTRAINT `laundry_like_laundryshop_id_911cbe31_fk_laundry_laundryshop_id` FOREIGN KEY (`laundryshop_id`) REFERENCES `laundry_laundryshop` (`id`),
  CONSTRAINT `laundry_like_profile_id_c04c3e8b_fk_myauth_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `myauth_profile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
