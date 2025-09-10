-- AMD (AM4 / AM5)
INSERT INTO cpus (brand, model, socket_id, clock_speed_mhz, cores, threads, tdp_watts, price_eur)
VALUES
('AMD','Ryzen 5 5600', (SELECT id FROM socket_types WHERE name='AM4'), 3700, 6, 12, 65, 129.99),
('AMD','Ryzen 7 5800X', (SELECT id FROM socket_types WHERE name='AM4'), 3800, 8, 16, 105, 199.99),
('AMD','Ryzen 5 7600', (SELECT id FROM socket_types WHERE name='AM5'), 3800, 6, 12, 65, 229.99),
('AMD','Ryzen 7 7700X', (SELECT id FROM socket_types WHERE name='AM5'), 4500, 8, 16, 105, 319.99);

-- Intel (LGA1700)
INSERT INTO cpus (brand, model, socket_id, clock_speed_mhz, cores, threads, tdp_watts, price_eur)
VALUES
('Intel','Core i5-12400F', (SELECT id FROM socket_types WHERE name='LGA1700'), 2500, 6, 12, 65, 149.99),
('Intel','Core i7-12700K', (SELECT id FROM socket_types WHERE name='LGA1700'), 3600, 12, 20, 125, 329.99),
('Intel','Core i5-13600K', (SELECT id FROM socket_types WHERE name='LGA1700'), 3500, 14, 20, 125, 319.99),
('Intel','Core i9-12900K', (SELECT id FROM socket_types WHERE name='LGA1700'), 3200, 16, 24, 125, 439.99);
