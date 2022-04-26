# About

This repository contains the backend application code with the application name "Rentskuy". The Rentskuy application is a rental application for all types of vehicles and can make transactions online through the Rentskuy application

# Installation

1. Clone this repository
```
git clone https://github.com/zalfanuramalia/fw5-backend-beginner.git
```

2. Install module
```
npm i
```

3. import Database vehicle_rent.sql
4. for run the project, write `nmp run dev` in terminal

# Rentskuy

Contains an Application Programming Interface (API) using Visual Studio Code applications, Node.js as a platform, and express.js as a framework from Node.js, as well as Postman as a container for testing the API that has been created.

# Built with

* Node.js
* Express.js
* Postman

# Endpoint

1. Vehicles Endpoint

| Method          | Endpoint      |           Remarks              |
| --------------- | ------------- | ------------------------------ |
| `Post`          | /vehicles     | Used for add new vehicle.      |
| `Get`           | /vehicles     | Used for get all vehicles.     |
| `Get`           | /vehicles/:id | Used for detail vehicle by id. |
| `Patch`         | /vehicles/:id | Used for set vehicles by id.   |
| `Delete`        | /vehicles/:id | Used for delete vehicle.       |

2. User Endpoint

| Method          | Endpoint      |           Remarks              |
| --------------- | ------------- | ------------------------------ |
| `Post`          | /users        | Used for add new users         |
| `Get`           | /users        | Used for get all users         |
| `Get`           | /users        | Used for detail users by id.   |
| `Patch`         | /users        | Used for set users by id.      |
| `Delete`        | /users        | Used for delete users          |

3. Auth Endpoint

| Method          | Endpoint         |        Remarks              |
| --------------- | ---------------- | --------------------------- |
| `Post`          | /auth/register   | Used for register account   |
| `Post`          | /auth/login      | Used for login account      |
| `Post`          | /auth/forgotPass | Used if user forgot password|
| `Post`          | /auth/verify     | Used for verify account     |

4. Category Endpoint

| Method          | Endpoint      |           Remarks              |
| --------------- | ------------- | ------------------------------ |
| `Post`          | /category     | Used for add new category      |
| `Get`           | /category     | Used for all category          |
| `Patch`         | /category/:id | Used for set category by id    |
| `Delete`        | /category/:id | Used for delete category       |

5. History Endpoint

| Method          | Endpoint          |            Remarks                  |
| --------------- | ----------------- | ----------------------------------- |
| `Post`          | /history          | Used for add new transaction        |
| `Get`           | /history          | Used for get all data history users |
| `Get`           | /history/vehicles | Used for get data by popular vehicle|
| `Get`           | /history/:id      | Used for get history by id          |
| `Patch`         | /history/users:id | Used for update history by id       |
| `Delete`        | /history/:id      | Used for delete history by id       |

6. Profile Endppoint

| Method          | Endpoint         |               Remarks              |
| --------------- | ---------------- | ---------------------------------- |
| `Get`           | /profile         | Used for get profile by user login |

## Deployment Backend

https://rentskuy.herokuapp.com
