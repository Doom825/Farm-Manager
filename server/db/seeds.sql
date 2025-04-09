INSERT INTO users (user_name, user_password, email)
VALUES ('ctbambrose', 'TestPass', 'test1@test.com'),
       ('xX_Farmer_Xx', 'TestPass', 'test2@test.com'),
       ('jedfalk', 'TestPass', 'test3@test.com'),
       ('Doom825', 'TestPass', 'test4@test.com'),
       ('I-0110', 'TestPass', 'test5@test.com');

INSERT INTO crops (crop_name, scientific_name)
VALUES ('Tomato'),
       ('Cabbage'),
       ('Carrot'),
       ('Corn'),
       ('Potato');

INSERT INTO user_crop (user_id, crop_id)
VALUES (1, 1),
       (1, 2),
       (2, 3),
       (2, 4),
       (2, 5),
       (3, 4),
       (4, 1),
       (4, 2),
       (5, 5),
       (5, 1);