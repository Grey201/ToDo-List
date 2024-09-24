const express = require("express");
const router = express.Router();
const taskController = require("../controllers/controllerTask");

router.get("/", taskController.getTask);
router.post("/", taskController.createTask);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;