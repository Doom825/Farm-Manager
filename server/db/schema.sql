DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

\c movies_db;

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(25) NOT NULL
);