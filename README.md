Mini URL Shortener API
A simple REST API built with Node.js, Express.js, and MongoDB to shorten URLs and redirect to the original URLs using short codes.

Setup Instructions:
1.Clone the Repository

git clone <(https://github.com/gyan1201/mini-url-shortener-api)>
cd url-shortener

2.Install Dependencies

npm install

Set Up Environment Variables
1.Create a .env file in the root directory with:

MONGODB_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:3000
PORT=3000

2.Ensure MongoDB is running locally, or use a cloud service like MongoDB Atlas and update MONGODB_URI accordingly.

Run the Server
bash
npm start

Usage with Postman
Shorten a URL
1.Create a POST request:

URL: http://localhost:3000/shorten
Headers: Content-Type: application/json
Body (JSON):
json
{
  "url": "https://example.com/some/very/long/link"
}

2.Expected Response:

json
{
  "shortUrl": "http://localhost:3000/abc123"
}

Access a Short URL
1.Create a GET request:

URL: http://localhost:3000/abc123
2.Expected Outcome:

Redirects to the original URL if the code exists.
Returns a 404 status if the code is not found.
