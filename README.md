# Task Manager REST API (Express + JSON File for Data)

A simple Node.js Express REST API that performs full CRUD operations on tasks stored in a local JSON file (task.json). Any change in Create , Update, Dele is not propagating the the source file, so that every time you run the project the state does not changes.

## Features

- File-based database (task.json)
- Create, Read, Update, Delete Tasks
- Filter tasks by completion status
- Strict validation for clean data
- Modular route architecture

## Folder Structure

    project/
    │
    ├── app.js             # Main server file
    ├── taskRoutes.js      # Separate router file for all /tasks APIs
    ├── task.json
    ├── package.json
    └── README.md

## Installation & Run

Steps to install required packages and then run the application

    npm install
    node app.js

If everything is fine the output will be -

    Server is listening on 3000

And the server will run on - <http://localhost:3000>

## API Endpoints

### ➤ GET /tasks

Retrieve all tasks

    GET /tasks

### ➤ GET /tasks?completed=true|false

Filter tasks by completion status

    GET /tasks?completed=true
    GET /tasks?completed=false

### ➤ GET /tasks/:id

Get a specific task

    GET /tasks/1

### ➤ POST /tasks

Create a new task

    POST /tasks

    body:

    {
        "title": "Learn Node",
        "description": "Build APIs",
        "completed": false
    }

### ➤ PUT /tasks/:id

Update an existing task

    PUT /tasks/1

    body:

    {
        "title": "Update Task",
        "description": "Task is updated",
        "completed": true
    }

### ➤ DELETE /tasks/:id

Delete a task

    DELETE /tasks/1


## Running Test Cases

All automated test cases are already written for this project. To execute the full test suite, simply run:

    npm run test


This will:

- Validate all API endpoints
- Check request/response formats
- Ensure data validation rules

If all tests pass, your API is working correctly ✅



# Author - Amlan Dutta