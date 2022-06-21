# Crypto Portfolio Tracker


## Backend Tech Stack 

* Bcrypt for handling password hashing
* JSON Web Token for authentication
* Dagger for Dependency-Injection 
* Junit and Mockito for testing
* AWS DynamoDB using a global secondary index for transaction history and data management
* AWS S3 for storing and retrieving data
* AWS Lambda to run code without managing a server
* AWS API Gateway for RESTful API endpoints

## Frontend Tech Stack 

* React 
  * Used reusable components for quicker development and better management of change implementation.
  * Used hooks to manage state in functional components.
  * Used react router to handle private and public routes for login and faster routing between components with less data to render.  
* Chart.js to display doughnut chart to interact with component updates.
  * There is better performance rendering large amounts of data using the Canvas element.
* JSON Web Token used for authentication with session storage.
* CSS for design aspect.
* Axios for HTTP client requests to API endpoints.


