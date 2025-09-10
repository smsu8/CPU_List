INSERT INTO socket_types (name) VALUES
  -- Aktuell / verbreitet
  ('AM5'), ('AM4'),
  ('LGA1700'), ('LGA1200'), ('LGA1151'),

  -- HEDT / Workstation
  ('sTR5'), ('sTRX4'), ('TR4'),
  ('LGA2066'), ('LGA2011-3'), ('LGA2011'),

  -- Server
  ('SP3'),
  ('LGA4677'), ('LGA4189'), ('LGA3647'),

  -- Ältere / Legacy (optional)
  ('AM3+'), ('AM3'), ('FM2+'),
  ('LGA1150'), ('LGA1155'), ('LGA1366'), ('LGA775')
ON CONFLICT DO NOTHING;
