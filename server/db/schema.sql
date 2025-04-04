DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

\c user_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(25) NOT NULL
);

-- CREATE TABLE crop (
--   id SERIAL PRIMARY KEY,
--   user_id INT,
--   crop VARCHAR
-- );

-- CREATE TABLE cropJournal (
--   id SERIAL PRIMARY KEY,
--   title VARCHAR,
--   body TEXT,
--   user_id INT,
--   crop_id INT,
--   entry_date timestamp
-- );