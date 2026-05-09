const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ─── In-memory data store ──────────────────────────────
let tasks = [
  { id: 1, title: "Set up project structure", status: "completed",   priority: "high"   },
  { id: 2, title: "Build login page",         status: "in-progress", priority: "high"   },
  { id: 3, title: "Write API documentation",  status: "pending",     priority: "medium" },
  { id: 4, title: "Test all endpoints",       status: "pending",     priority: "low"    },
];
let nextId = 5;

const VALID_STATUSES   = ["pending", "in-progress", "completed"];
const VALID_PRIORITIES = ["low", "medium", "high"];

// ─── GET / — API info ──────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Manager API is running",
    endpoints: {
      "GET    /tasks":       "Get all tasks",
      "GET    /tasks/:id":   "Get a single task",
      "POST   /tasks":       "Create a new task",
      "PUT    /tasks/:id":   "Update a task",
      "DELETE /tasks/:id":   "Delete a task",
    },
  });
});

// ─── GET /tasks — get all tasks ────────────────────────
app.get("/tasks", (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// ─── GET /tasks/:id — get one task ────────────────────
app.get("/tasks/:id", (req, res) => {
  const id   = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `No task found with id ${id}`,
    });
  }

  res.status(200).json({ success: true, data: task });
});

// ─── POST /tasks — create a task ──────────────────────
app.post("/tasks", (req, res) => {
  const { title, status, priority } = req.body;
  const errors = [];

  if (!title || title.trim() === "") {
    errors.push("'title' is required");
  }
  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`'status' must be one of: ${VALID_STATUSES.join(", ")}`);
  }
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`'priority' must be one of: ${VALID_PRIORITIES.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }

  const newTask = {
    id:       nextId++,
    title:    title.trim(),
    status:   status   || "pending",
    priority: priority || "medium",
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
});

// ─── PUT /tasks/:id — update a task ───────────────────
app.put("/tasks/:id", (req, res) => {
  const id    = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `No task found with id ${id}` });
  }

  const { title, status, priority } = req.body;
  const errors = [];

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`'status' must be one of: ${VALID_STATUSES.join(", ")}`);
  }
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`'priority' must be one of: ${VALID_PRIORITIES.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }

  if (title)    tasks[index].title    = title.trim();
  if (status)   tasks[index].status   = status;
  if (priority) tasks[index].priority = priority;

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: tasks[index],
  });
});

// ─── DELETE /tasks/:id — delete a task ────────────────
app.delete("/tasks/:id", (req, res) => {
  const id    = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `No task found with id ${id}` });
  }

  const deleted = tasks.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Task "${deleted.title}" deleted`,
    data: deleted,
  });
});

// ─── 404 — unknown routes ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// ─── Global error handler ─────────────────────────────
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ─── Start server ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Task Manager API running at http://localhost:${PORT}`);
});
