# The Free Agency Project
***This is a review site for NBA Free Agents. Users can  create accounts, add comments on available NBA Free Agents. Administrators can manage users, delete comments and manage users and add additional features.***
## Demo
Try it out here: <a href="https://the-free-agency.herokuapp.com/">The Free Agency</a>

We implemented external API to get players’ information and seed it to the database, allowing users to
see most recent data

We utilized Model Serializers to filter data entries from the Postgres database into the React Router
Controller

The back-end in implemented in Ruby on Rails, serving as API endpoints and we used React  for the  front end.

# Authors
* Ian Highsmith
* Cassandra King
* Jacob Merrell
* Eric Ruan

## Technologies
* Backend: Rails 5.1.5
* Webpacker
* Frontend: React.js
* Database: PostgreSQL
* User Auth: Devise
* Styling: CSS3 & Foundation
* Testing: RSpec, Capybara, Jasmine, Karma, Enzyme

## To run locally
* Install Ruby.2.3.3
* In a terminal, run git clone `https://github.com/cassking/the-free-agency.git`
* Navigate to the project's root directory with `cd the-free-agency`
* Run `bundle install && yarn install && npm install && rake db:create && rake db:migrate && rake db:seed`
* In a separate terminal windows, run `npm start` && `rails server -- or-- rails s`

* Visit http://localhost:3000/ in your browser.

![Build Status](https://codeship.com/projects/eba289e0-084f-0136-babb-6685fd843c27/status?branch=master)
[![Code Climate](https://codeclimate.com/github/cassking/the-free-agency/badges/gpa.svg)](https://codeclimate.com/github/cassking/the-free-agency)
[![Coverage Status](https://coveralls.io/repos/github/cassking/the-free-agency/badge.svg?branch=master)](https://coveralls.io/github/cassking/the-free-agency?branch=master)
