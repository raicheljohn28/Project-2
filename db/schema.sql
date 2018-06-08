drop database restaurantreview_db;

CREATE DATABASE restaurantReview_db;
USE restaurantReview_db;
CREATE TABLE restaurant
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    address VARCHAR (1000) ,
    phone VARCHAR (1000) ,
    url VARCHAR (100) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE review
(
id int NOT NULL AUTO_INCREMENT,
    rating INTEGER (10) NOT NULL,
    review VARCHAR (1000) NULL,
	username varchar(30) NOT NULL,
    restaurant varchar(50) not null,
    PRIMARY KEY(id)
);

CREATE TABLE users
(
id int NOT NULL AUTO_INCREMENT,
username varchar(30) not null,
PRIMARY KEY(id)
);

