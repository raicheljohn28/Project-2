drop database restaurantreview_db;

CREATE DATABASE restaurantReview_db;
USE restaurantReview_db;
CREATE TABLE restaurant
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
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
     username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    PRIMARY KEY(id)
    );


