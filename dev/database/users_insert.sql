INSERT INTO member (first_name, last_name, member_password, email, date_of_birth, gender, preferred_genders, min_age, max_age, relationship_type, height, religion, want_kids, city, token, email_confirmed) 
VALUES
('John', 'Doe', 'password123', 'john.doe1@example.com', '1990-05-12', 'Male'::GENDER, ARRAY['Female', 'Non-Binary']::GENDER[], 20, 35, 'longterm'::RELATIONSHIP, 180, NULL, TRUE, 'New York', 'token12345', TRUE),
('Jane', 'Smith', 'password123', 'jane.smith2@example.com', '1988-11-22', 'Female'::GENDER, ARRAY['Male']::GENDER[], 25, 40, 'shortterm'::RELATIONSHIP, 165, NULL, FALSE, 'Los Angeles', 'token12346', FALSE),
('Alice', 'Brown', 'password123', 'alice.brown3@example.com', '1995-06-15', 'Female'::GENDER, ARRAY['Male', 'Female']::GENDER[], 18, 30, 'fun'::RELATIONSHIP, 170, NULL, TRUE, 'Chicago', 'token12347', TRUE),
('Michael', 'Johnson', 'password123', 'michael.johnson4@example.com', '1982-09-08', 'Male'::GENDER, ARRAY['Female', 'Other']::GENDER[], 28, 50, 'longterm'::RELATIONSHIP, 175, NULL, TRUE, 'Houston', 'token12348', FALSE),
('Emily', 'Davis', 'password123', 'emily.davis5@example.com', '1993-04-30', 'Female'::GENDER, ARRAY['Male']::GENDER[], 22, 45, 'longterm'::RELATIONSHIP, 160, NULL, TRUE, 'Phoenix', 'token12349', TRUE),
('David', 'Miller', 'password123', 'david.miller6@example.com', '1978-12-14', 'Male'::GENDER, ARRAY['Non-Binary']::GENDER[], 30, 55, 'shortterm'::RELATIONSHIP, 190, NULL, FALSE, 'Philadelphia', 'token12350', FALSE),
('Sophia', 'Wilson', 'password123', 'sophia.wilson7@example.com', '1997-03-18', 'Female'::GENDER, ARRAY['Female']::GENDER[], 21, 40, 'fun'::RELATIONSHIP, 155, NULL, TRUE, 'San Antonio', 'token12351', TRUE),
('James', 'Moore', 'password123', 'james.moore8@example.com', '1985-07-25', 'Male'::GENDER, ARRAY['Female', 'Other']::GENDER[], 26, 38, 'shortterm'::RELATIONSHIP, 185, NULL, FALSE, 'San Diego', 'token12352', FALSE),
('Olivia', 'Taylor', 'password123', 'olivia.taylor9@example.com', '1990-02-03', 'Female'::GENDER, ARRAY['Male']::GENDER[], 24, 50, 'longterm'::RELATIONSHIP, 168, NULL, TRUE, 'Dallas', 'token12353', TRUE),
('Daniel', 'Anderson', 'password123', 'daniel.anderson10@example.com', '1989-08-10', 'Male'::GENDER, ARRAY['Female', 'Non-Binary']::GENDER[], 27, 45, 'fun'::RELATIONSHIP, 172, NULL, TRUE, 'San Jose', 'token12354', FALSE),
('Emma', 'Thomas', 'password123', 'emma.thomas11@example.com', '1996-05-21', 'Female'::GENDER, ARRAY['Male']::GENDER[], 23, 39, 'longterm'::RELATIONSHIP, 162, NULL, FALSE, 'Austin', 'token12355', TRUE),
('Christopher', 'Jackson', 'password123', 'christopher.jackson12@example.com', '1977-01-12', 'Male'::GENDER, ARRAY['Female']::GENDER[], 31, 60, 'shortterm'::RELATIONSHIP, 195, NULL, TRUE, 'Jacksonville', 'token12356', FALSE),
('Isabella', 'White', 'password123', 'isabella.white13@example.com', '1994-11-09', 'Female'::GENDER, ARRAY['Female']::GENDER[], 20, 35, 'fun'::RELATIONSHIP, 167, NULL, TRUE, 'San Francisco', 'token12357', TRUE),
('Matthew', 'Harris', 'password123', 'matthew.harris14@example.com', '1980-03-02', 'Male'::GENDER, ARRAY['Male']::GENDER[], 29, 48, 'longterm'::RELATIONSHIP, 178, NULL, TRUE, 'Columbus', 'token12358', FALSE),
('Ava', 'Martin', 'password123', 'ava.martin15@example.com', '1991-07-13', 'Female'::GENDER, ARRAY['Female']::GENDER[], 19, 33, 'shortterm'::RELATIONSHIP, 158, NULL, TRUE, 'Fort Worth', 'token12359', TRUE),
('Anthony', 'Garcia', 'password123', 'anthony.garcia16@example.com', '1984-06-28', 'Male'::GENDER, ARRAY['Female']::GENDER[], 32, 46, 'fun'::RELATIONSHIP, 182, NULL, FALSE, 'Indianapolis', 'token12360', FALSE),
('Mia', 'Martinez', 'password123', 'mia.martinez17@example.com', '1992-10-05', 'Female'::GENDER, ARRAY['Female']::GENDER[], 24, 41, 'longterm'::RELATIONSHIP, 161, NULL, TRUE, 'Charlotte', 'token12361', TRUE),
('Joshua', 'Rodriguez', 'password123', 'joshua.rodriguez18@example.com', '1987-02-15', 'Male'::GENDER, ARRAY['Female', 'Non-Binary']::GENDER[], 26, 50, 'shortterm'::RELATIONSHIP, 188, NULL, FALSE, 'Seattle', 'token12362', FALSE),
('Amelia', 'Lopez', 'password123', 'amelia.lopez19@example.com', '1993-09-30', 'Female'::GENDER, ARRAY['Female']::GENDER[], 22, 38, 'fun'::RELATIONSHIP, 164, NULL, TRUE, 'Denver', 'token12363', TRUE),
('Ethan', 'Gonzalez', 'password123', 'ethan.gonzalez20@example.com', '1983-12-07', 'Male'::GENDER, ARRAY['Male']::GENDER[], 30, 55, 'longterm'::RELATIONSHIP, 183, NULL, TRUE, 'Washington', 'token12364', FALSE);


INSERT INTO member_activities (member_id, activity_id)
VALUES
  (1, 1), (1, 3), (1, 4),
  (2, 2), (2, 6),
  (3, 5), (3, 20),
  (4, 13), (4, 14),
  (5, 15), (5, 12),
  (6, 8), (6, 17),
  (7, 4), (7, 5),
  (8, 9), (8, 11),
  (9, 18), (9, 19),
  (10, 16), (10, 7),
  (11, 2), (11, 19),
  (12, 12), (12, 10),
  (13, 7), (13, 15),
  (14, 1), (14, 18),
  (15, 10), (15, 13),
  (16, 14), (16, 6),
  (17, 11), (17, 16),
  (18, 17), (18, 20);

INSERT INTO suggestion (date_creation, member_id_1, member_id_2, situation)
VALUES
  (CURRENT_DATE, 1, 2, 'yes'),
  (CURRENT_DATE, 1, 3, 'yes'),
  (CURRENT_DATE, 1, 4, 'yes'),
  (CURRENT_DATE, 1, 5, 'pending'),
  (CURRENT_DATE, 1, 6, 'pending'),
  (CURRENT_DATE, 1, 7, 'pending'),
  (CURRENT_DATE, 1, 8, 'pending'),
  (CURRENT_DATE, 1, 9, 'pending'),
  (CURRENT_DATE, 1, 10, 'pending'),
  (CURRENT_DATE, 1, 11, 'pending'),
  (CURRENT_DATE, 1, 12, 'pending'),
  (CURRENT_DATE, 1, 13, 'pending'),
  (CURRENT_DATE, 2, 1, 'yes'),
  (CURRENT_DATE, 3, 1, 'yes'),
  (CURRENT_DATE, 4, 1, 'yes');

INSERT INTO member_match (suggestion_id, chatroom_name)
VALUES
  (1, 'chatroom_1_2'),
  (2, 'chatroom_1_3'),
  (3, 'chatroom_1_4');

INSERT INTO msg(match_id,sender_id,msg,date_sent) VALUES(1,2,'Hello',CURRENT_DATE);
