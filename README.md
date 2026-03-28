
# Jokebook App

## Description
I am using Node.js + Express + PostgreSQL app for managing jokes by category.  

Features:
- View categories of jokes
- Get jokes by category (with optional limit)
- Get a random joke
- Add new jokes

## Database

CREATE TABLE jokebook (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    setup TEXT NOT NULL,
    delivery TEXT NOT NULL
);

INSERT INTO jokebook (category, setup, delivery) VALUES
('funnyJoke', 'Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!'),
('funnyJoke', 'What kind of tree fits in your hand?', 'A palm tree'),
('funnyJoke', 'What is worse than raining cats and dogs?', 'Hailing taxis'),
('lameJoke', 'Which bear is the most condescending?', 'Pan-DUH'),
('lameJoke', 'What would the Terminator be called in his retirement?', 'The Exterminator');

## Setup
- Clone this repo
- Install dependencies  (npm install)
- Add .env with your database URL
- Run server (node server.js)
- Open in browser http://localhost:3000/

## API Endpoints
Method	Endpoint	                Description
GET	   /jokebook/categories	        List all categories
GET	   /jokebook/category/:category	List jokes in a category
GET	   /jokebook/random	            Get a random joke
POST   /jokebook/joke/add	        Add a joke

## Demo Video: