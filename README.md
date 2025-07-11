Mini URL Shortener API
A simple REST API built with Node.js, Express.js, and MongoDB to shorten URLs and redirect to the original URLs using short codes.
Setup Instructions

Clone the Repository:
git clone <repository-url>
cd url-shortener


Install Dependencies:
npm install


Set Up Environment Variables:

Create a .env file in the root directory with:MONGODB_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:3000
PORT=3000


Ensure MongoDB is running locally, or use a cloud service like MongoDB Atlas and update MONGODB_URI accordingly.


Run the Server:




ව

Usage:

Shorten a URL:Send a POST request to /shorten with a JSON body:
{ "url": "https://example.com/some/very/long/link" }

Response:
{ "shortUrl": "http://localhost:3000/abc123" }


Access a Short URL:Send a GET request to /:code, e.g., http://localhost:3000/abc123.

Redirects to the original URL if found.
Returns 404 if not found.





Testing
Test the API using tools like Postman or curl:

POST /shorten:
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d '{"url":"https://example.com"}'


GET /:code:
curl -L http://localhost:3000/abc123



Notes

The short code is a random 6-character string (e.g., "abc123").
In production, replace BASE_URL with your domain (e.g., https://short.ly).
Add .env to .gitignore to keep sensitive data secure.
