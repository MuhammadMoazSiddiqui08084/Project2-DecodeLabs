# Task Manager API

A simple and efficient backend API for managing tasks, built with Node.js and Express.

## 📋 Project Overview

This is **DecodeLabs Project 2** — a REST API that provides complete task management functionality. The API supports creating, reading, updating, and deleting tasks with features like status tracking and priority levels.

## ✨ Features

- **CRUD Operations**: Full Create, Read, Update, Delete functionality for tasks
- **Task Status Tracking**: Tasks can be marked as `pending`, `in-progress`, or `completed`
- **Priority Levels**: Tasks support `low`, `medium`, and `high` priority levels
- **In-Memory Data Store**: Quick setup without database dependencies
- **RESTful API Design**: Clean and intuitive endpoint structure
- **JSON Responses**: Structured JSON responses with success indicators and metadata

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

Start the development server:

```bash
npm start
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get API information and available endpoints |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/:id` | Retrieve a specific task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

### Example Requests

**Get all tasks:**
```bash
curl http://localhost:3000/tasks
```

**Create a new task:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "status": "pending",
    "priority": "high"
  }'
```

**Update a task:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in-progress"
  }'
```

## 📦 Dependencies

- **express** (^4.18.2): Fast, unopinionated web framework for Node.js

## 🔧 Project Structure

```
.
├── server.js       # Main server file with all API endpoints
├── package.json    # Project metadata and dependencies
└── README.md       # This file
```

## 📝 Task Properties

Each task object contains:

- **id** (number): Unique identifier
- **title** (string): Task description
- **status** (string): One of `pending`, `in-progress`, `completed`
- **priority** (string): One of `low`, `medium`, `high`

## 🎯 Sample Tasks

The API comes pre-populated with sample tasks:

1. "Set up project structure" - completed - high priority
2. "Build login page" - in-progress - high priority
3. "Write API documentation" - pending - medium priority
4. "Test all endpoints" - pending - low priority

## 🚦 Status and Priority Values

**Valid Statuses:**
- `pending` - Task is waiting to be started
- `in-progress` - Task is currently being worked on
- `completed` - Task has been finished

**Valid Priorities:**
- `low` - Low importance
- `medium` - Medium importance
- `high` - High importance

## 👨‍💼 About DecodeLabs

This project is part of the DecodeLabs internship program, focusing on backend API development and REST principles.

## 📄 License

This project is part of the DecodeLabs internship program.

---

**Created:** 2026  
**Author:** DecodeLabs Team
