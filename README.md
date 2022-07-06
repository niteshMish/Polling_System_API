# polling_System_API
## what  will  API serve 
* one can create poll for any question
* one can create question and it's options and options can be voted 
## Tech stack
node js , mongo DB
##  features
* API to add question to the database :: URL (POST) :

  /questions/create
* API to add option to the database :: URL (POST) :

  /questions/:id/options/create

* API to show question detail :: URL (GET) :

  /questions/:id

* API to add vote to option :: URL (GET) :

   /options/:id/add_vote
* API to delete question :: URL (GET) :

  /questions/:id/delete
* API to delete option :: URL (GET) :

  /options/:id/delete
# Requirements
For development, you will only need Node.js and a node global package installed in your environement and mongodb for database.

Node
Node Installtion on Windows Go on to the official Node.js website and download the installer. Also, be sure to have .git available in your PATH, npm might need it (You can find git).

Other operating System You can find more information about the installation on the official Node.js website and the official NPM website.

 ## If the installation was successful, you should be able to run the following command.

  node --version

  npm --version

# Install
Clone this repository from my git repo

Install all dependencies using:

  npm install

# Running the Project
  node index.js
