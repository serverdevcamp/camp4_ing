CREATE TABLE `laundry_laundryitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(10) NOT NULL,
  `material` varchar(10) NOT NULL,
  `price` int unsigned NOT NULL,
  `laundry_shop_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `laundry_laundryitem_laundry_shop_id_9e0d4ef6_fk_laundry_l` (`laundry_shop_id`),
  CONSTRAINT `laundry_laundryitem_laundry_shop_id_9e0d4ef6_fk_laundry_l` FOREIGN KEY (`laundry_shop_id`) REFERENCES `laundry_laundryshop` (`id`),
  CONSTRAINT `laundry_laundryitem_chk_1` CHECK ((`price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
