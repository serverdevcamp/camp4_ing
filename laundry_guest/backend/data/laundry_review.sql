CREATE TABLE `laundry_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `grade` smallint NOT NULL,
  `image` json NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `laundryshop_id` int NOT NULL,
  `profile_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `laundry_review_laundryshop_id_8421b3df_fk_laundry_laundryshop_id` (`laundryshop_id`),
  KEY `laundry_review_profile_id_d60083ea_fk_myauth_profile_id` (`profile_id`),
  CONSTRAINT `laundry_review_laundryshop_id_8421b3df_fk_laundry_laundryshop_id` FOREIGN KEY (`laundryshop_id`) REFERENCES `laundry_laundryshop` (`id`),
  CONSTRAINT `laundry_review_profile_id_d60083ea_fk_myauth_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `myauth_profile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
