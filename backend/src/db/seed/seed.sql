-- SQL commands to create tables for students and grades
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    enrollment_year INT NOT NULL
);

CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    grade DECIMAL(3, 2) NOT NULL,
    semester INT NOT NULL
);

-- SQL commands to insert initial data into students table
INSERT INTO students (name, email, enrollment_year) VALUES
('John Doe', 'john.doe@example.com', 2021),
('Jane Smith', 'jane.smith@example.com', 2020),
('Alice Johnson', 'alice.johnson@example.com', 2022);

-- SQL commands to insert initial data into grades table
INSERT INTO grades (student_id, subject, grade, semester) VALUES
(1, 'Mathematics', 3.5, 1),
(1, 'Physics', 4.0, 1),
(2, 'Mathematics', 2.0, 1),
(2, 'Chemistry', 3.0, 1),
(3, 'Biology', 3.8, 1);