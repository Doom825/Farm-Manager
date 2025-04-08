DROP DATABASE IF EXISTS user_db;
DROP DATABASE IF EXISTS farmer_db;
CREATE DATABASE farmer_db;

\c farmer_db;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE NOT NULL
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
    title VARCHAR(255),  -- Specify length for VARCHAR
    body TEXT,
    user_id INT,
    crop_id INT,
    entry_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE SET NULL
);