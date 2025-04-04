DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

\c user_db;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE crops (
    crop_id SERIAL PRIMARY KEY,
    crop_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_crop (
    user_id INT,
    crop_id INT,
    PRIMARY KEY (user_id, crop_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE
);

CREATE TABLE cropJournal (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  body TEXT,
  user_id INT,
  crop_id INT,
  entry_date timestamp,
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE SET NULL
);