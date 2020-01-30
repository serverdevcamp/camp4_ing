CREATE TABLE `order_orderitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` smallint NOT NULL,
  `laundry_item_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_orderitem_laundry_item_id_9ff0f3b8_fk_laundry_l` (`laundry_item_id`),
  KEY `order_orderitem_order_id_aba34f44_fk_order_order_id` (`order_id`),
  CONSTRAINT `order_orderitem_laundry_item_id_9ff0f3b8_fk_laundry_l` FOREIGN KEY (`laundry_item_id`) REFERENCES `laundry_laundryitem` (`id`),
  CONSTRAINT `order_orderitem_order_id_aba34f44_fk_order_order_id` FOREIGN KEY (`order_id`) REFERENCES `order_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
