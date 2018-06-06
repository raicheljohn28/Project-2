USE restaurantReview_db;
INSERT INTO restaurant (name, address, phone, url)
VALUES ( "Gypsy Grill", "187 Newark Avenue Jersey City, NJ 07302", "2018395115", "http://gypsygrillny.com/"),
("Orale Mexican Kitchen", "341 Grove Street Jersey City, NJ 07302", "2013330001", "https://www.oralemk.com/"),
("Mighty Quinns", "850 Route 3 West (Entrance Faces Route 3) Clifton, NJ 07012", "9737778340", "http://mightyquinnsbbq.com/"),
("Rio Grande", "37 02 Broadway Long Island City, NY 11103", "3478320112", "http://riograndebrazilianbarbecue.business.site/"),
("Abuja International", "1784 Burnet Avenue Union, NJ 07083", "9738214212", "http://www.abujainternational.com/");

insert into review(rating, review, username, password)
values(4, "The chicken shawafel is great here although the falafels are a little on the dry side the combination makes up for it.", "abc", "123"),
(3, "As the title says it was excellent and especially the yucca fritters were the best I ever had. Will definately return.", "Jana", "345"),
(5, "Delish!!!! Sometimes the line is long because it takes a while to order but the food is amazing!", "Julia", "678"),
(4, "Great service. Good food. Wonderful margaritas!", "Ben", "912"),
(3, "I love this place. Some of the best West African food I have tasted. Excellent, friendly service! Great drink selections as well.", "Montai", "134");

select * from restaurant;
select * from review;

SELECT name, review, rating
from restaurant
RIGHT JOIN review ON restaurant.name = review.id;



