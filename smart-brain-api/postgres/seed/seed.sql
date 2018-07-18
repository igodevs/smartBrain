BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined, age, pet) values ('Test', 'a@a.com', 5, '2018-01-01', 50, 'cat');
INSERT INTO login (hash,email) values('$2a$10$EDG6KncDz2vVu0E8QC5acOM.sdujt8EkZ2.wXHg49IEBYOK3GzUpy', 'a@a.com');

COMMIT;