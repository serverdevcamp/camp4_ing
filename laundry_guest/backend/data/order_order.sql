CREATE TABLE `order_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_price` int unsigned NOT NULL,
  `payment_method` varchar(10) NOT NULL,
  `status` varchar(9) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `laundry_shop_id` int NOT NULL,
  `profile_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_order_laundry_shop_id_f1245ebb_fk_laundry_laundryshop_id` (`laundry_shop_id`),
  KEY `order_order_profile_id_636c798b_fk_myauth_profile_id` (`profile_id`),
  KEY `order_order_status_1e381235` (`status`),
  CONSTRAINT `order_order_laundry_shop_id_f1245ebb_fk_laundry_laundryshop_id` FOREIGN KEY (`laundry_shop_id`) REFERENCES `laundry_laundryshop` (`id`),
  CONSTRAINT `order_order_profile_id_636c798b_fk_myauth_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `myauth_profile` (`id`),
  CONSTRAINT `order_order_chk_1` CHECK ((`total_price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
