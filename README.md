## DocumentDB with Multiple Replica Sets

Steps to run the project.  
**cd** into the project directory  
Create .env file in root directory.  
The content of the **.env** will look like this.  

    NODE_ENV=development
    PORT=8080
    JWT_SECRET=somesecret
    JWT_EXPIRATION_MINUTES=50
    MONGO_URI=respective connection string
    MONGO_URI_TESTS=respective connection string

> **npm install**

Run development mode.
> **npm run dev**


To run on production server

> **npm run start**


### Docker 

> `docker build -t username/docdb-api-app .`  
> `docker run -p 8080:8080 -d username/docdb-api-app`  
> The app uses Amazon's DocumentDB


