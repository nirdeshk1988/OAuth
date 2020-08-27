# Prerequisite : 

* Install the Nodejs.
* To store the account data in MongoDB , create a free MongoDB account from below URL
  https://cloud.mongodb.com/

# Setup

* Clone the repo in your local folder.
* Run the below command to install the npm supporting 
   npm install
* Go to your salesforce and create the connected app.
* Open the web-server.js file and update the callback url ,client id and Client Secret from your connected app.
* Open the uer-agent.js file and update the callback url and cunsumer key.
* If you are running the user-agent flow and add the callback URL in CORS section of Salesforce. 
* Update the web-server.js file with MongoDB url to store the account data in database.

# RUN WEB-Server Flow

* Open the temminal and run the below command.
   *nodemon web-server.js
   
# RUN User-Agent Flow

* Open the temminal and run the below command.
   *nodemon user-agent.js
   
