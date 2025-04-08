INSERT INTO users (user_name)
VALUES ('ctbambrose'),
       ('xX_Farmer_Xx'),
       ('jedfalk'),
       ('Doom825'),
       ('I-0110');

INSERT INTO crops (crop_name)
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