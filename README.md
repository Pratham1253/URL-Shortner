URL Shortener

Overview

The URL Shortener is a web application that converts long URLs into short, easy-to-share links. It allows users to generate short URLs, track link analytics, and manage shortened links efficiently.

Features

Shorten long URLs

Custom short URLs (optional)

Track the number of clicks on shortened links

User authentication for managing links (optional)

API support for URL shortening

Technologies Used

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (optional)

Deployment: Vercel/Netlify (Frontend), Render/Heroku (Backend)

Installation

Prerequisites

Node.js and npm installed

MongoDB installed or a cloud database (MongoDB Atlas)

API Endpoints

Method

Endpoint

Description

POST

/api/shorten

Shorten a long URL

GET

/:shortId

Redirect to the long URL

GET

/api/stats/:id

Get stats for a short URL

Deployment

Frontend: Deploy on Vercel or Netlify

Backend: Deploy on Render or Heroku

Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

License

This project is licensed under the MIT License.

Contact

For any queries, reach out at shahpratham1253@gmail.com
