# EECS4413-SpeedyMart
EECS4413 Final Project

# Notes
- The dependences in `./package.json` must match dependencies in `/server/package.json` otherwise you'll get node module errors in Heroku.

# Curl Commands for test cases
```javascript
# Note that not all REST commands could be executed using curl. There were some with user authentication based on Mongoose User Schema verification
# Create a new order
curl --location --request POST 'https://speedymart.herokuapp.com/api/orders' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTk5OWNhZTRmOGI2MGJiOTFkYmUzNSIsImlhdCI6MTY1MDI5MzQ3NiwiZXhwIjoxNjUyODg1NDc2fQ._nA779FIcYEhg02Iu34MXqBg_-xsRON6SQvMfmzcWBs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "orderItems":[
        {
            "name": "SPRITE Original",
            "qty": 1,
            "image": "https://speedymart.s3.us-east-2.amazonaws.com/SPRITE.png",
            "price": 0.99,
            "product": "6259f9243476225232cd7ba1"
        }
    ],
    "shippingAddress": {
        "street":"123 derp st",
        "unit": "Unit 2",
        "city": "Toronto",
        "province": "Ontario",
        "postalCode": "A1B 2C3",
        "country": "Canada"
    },
    "paymentMethod":"Visa",
    "itemsPrice": 99.99,
    "taxPrice":1.01,
    "totalPrice":101.1
}'

# Get current user's order (hardcoded token)
curl --location --request GET 'https://speedymart.herokuapp.com/api/orders' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNThhZGI0MmYwNmFlNWMxNDZiNGExNSIsImlhdCI6MTY1MDA1MTY5MSwiZXhwIjoxNjUyNjQzNjkxfQ.Uqx3ocaB2JvdGThdBR92sGNcGYJLqZkvvqnvkRN4BFs'

# Modify Product
curl --location --request PUT 'https://speedymart.herokuapp.com/api/products/6259f9243476225232cd7ba1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "price":1.98
}'

# Get all Products
curl --location --request GET 'https://speedymart.herokuapp.com/api/products?keyword=SPRITE'

# Get product based on id
curl --location --request GET 'https://speedymart.herokuapp.com/api/products/6259f8e93476225232cd7b9a'

# User Login
curl --location --request POST 'https://speedymart.herokuapp.com/api/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"a@a.com",
    "password":"pass123"
}'



# Note that not all REST commands could be executed using curl. There were some with user authentication based on Mongoose User Schema verification
```
