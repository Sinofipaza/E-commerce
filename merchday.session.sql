CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)


INSERT INTO users (name, surname, phone_number, email, password) VALUES
('Sino', 'Fipaza', '0123456789', 'sino@gmail.com', '000000');