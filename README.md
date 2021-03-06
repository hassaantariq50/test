# Indego backend
Indego is Philadelphia's bike-sharing program, with many bike stations in the city. The [Indego GeoJSON station status API](https://www.rideindego.com/stations/json/) provides a realtime snapshot of
the number of bikes available, number of open docks available (not currently containing a bike), and total number of docks at every station. This API is free and requires no API key. The
[Open Weather Map API](https://openweathermap.org/current#name) provides a realtime snapshot of the current weather in a given city. Since Philadelphia is a small geographical area it is sufficient to
obtain the weather for a geographical location central to Philadelphia. This API has a free plan, you will need to sign up for an API key.
# About Project
Using Typescript, Node.js, and Express created a new API server which accumulates data over time and provides access to historical data for both weather and Indego bike availability.
# Requirement
Nodejs >= 12.x.x
MongoDB >= 4.x.x
# Installation
npm install
# Run
npm start
# Test
npm test
# Swagger
Swagger is an Interface Description Language for describing RESTful APIs expressed using JSON.
URL: https://test-indego.herokuapp.com/swagger/
# Chai
Since I have worked on chai so I have used chai in this project. Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript/typescript testing framework.
# Mocha
It works with chai, it is very Simple, flexible, JavaScript/Typescript test framework for Node.js & The Browser 
# Heroku
Heroku is a cloud platform that lets you build, deliver, monitor and scale apps — we're the fastest way to go from idea to URL, bypassing all those infrastructure headaches.
