const express = require("express");
const router = express.Router();
const todoController = require("../controllers/controllerTodo");
const { body } = require("express-validator");

router.get("/", todoController.getTodo);

// Валидация для создания новой задачи
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description")
      .isLength({ max: 200 })
      .withMessage("Description can not longer than 200 characters"),
  ],
  todoController.createTodo
);
// Валидация для обновления задачи
router.put(
  "/update/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description")
      .isLength({ max: 200 })
      .withMessage("Description can not longer than 200 characters"),
  ],
  todoController.updateTodo
);

router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;
