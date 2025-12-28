const express = require('express');
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FILE = path.join(__dirname, "task.json");
const parsedData = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
const tasks = Array.isArray(parsedData) ? parsedData : parsedData.tasks;

function getMaxId(){
    if (!tasks.length) return 0;
    return Math.max(...tasks.map(t => t.id));
}

router.get("/", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
        if (completed !== "true" && completed !== "false") {
            return res.status(400).json({
                message: "completed must be true or false"
            });
        }

        const completedBool = completed === "true";
        const filteredTasks = tasks.filter(t => t.completed ===  completedBool);
        return res.json(filteredTasks);
    }
    res.json(tasks);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
});

router.post("/", (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || !description || completed === undefined)
    return res.status(400).json({ message: "All fields are required" });

  if(typeof title != 'string' || typeof description != 'string' || typeof completed != 'boolean')
    return res.status(400).json({ message: "All fields datatypes are not as expected" });

  const maxId = getMaxId();

  const newTask = {
    id: maxId + 1,
    title,
    description,
    completed
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const { title, description, completed } = req.body;

  if (!title || !description || completed === undefined)
    return res.status(400).json({ message: "All fields are required" });

  if(typeof title != 'string' || typeof description != 'string' || typeof completed != 'boolean')
    return res.status(400).json({ message: "All fields datatypes are not as expected" });

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
});

module.exports = router;