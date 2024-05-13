# Backend-Employee-Management-System


## Objectives:
### Authentication & Authorization: 
A user authentication system with JWTs using Passport. Support secure password storage with bcrypt. Set up rolebased authorization with “Admin” and “Employee” roles.
### CRUD Operations: 
Build APIs to perform CRUD operations on the Employee resource. Ensure only Admins can add or delete employee data. Ensure Employees can view and edit only their own data.
###  Database Integration: 
MongoDB for storing user and employee data. Utilize Mongoose for data modeling.
### Security:
JWTs and Passport middleware for protecting routes. Enforce password policies and JWT expiration times.

### Endpoints:

1. POST /auth/register: Register a new user.
2. POST /auth/login: Authenticate and receive a JWT.
3. GET /employees: Get a list of employees (Admins only, with pagination).
4. GET /employees/:id: View an employee’s data (Admin or self).
5. POST /employees: Add a new employee (Admins only).
6. PUT /employees/:id: Update employee data (Admin or self).
7. DELETE /employees/:id: Delete an employee (Admins only).

### Setting up and running process

1. At first clone this repo.

2. Set up the .env file
After cloing create file named .env in the root of the folder, which will include this three things
MONGO_URI =  your string connection
PORT = 3000 or your own wish port
JWT_SECRET = Your_jwt secret(it can be anything)

3. Run this command->  npm install

4. Run the server  ->  npm start

5. With postman you can check if api works perfectly or not.
