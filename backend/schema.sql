-- Clean schema: only store cooperation registrations
DROP TABLE IF EXISTS registrations CASCADE;

CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(100) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  cooperation_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
