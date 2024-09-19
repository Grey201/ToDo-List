const { compile } = require("ejs");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/todo-list")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error: ", err));

  const db=mongoose.connection;
  let todos=[];

  const getTodos = async () => {
    try {
      const todos = await db.collection('todos').find().toArray();
      console.log("Todos: ", todos);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  const createTodo = async (title, description) => {
    const todo = {
      title,
      description,
completed: false
    };

    try {
        const result=await db.collection('todos').insertOne(todo);
        console.log("Todo created: ", result.insertedId);
        getTodos();
    } catch (error) {
        console.error('Error creating todo: ', error);
    }
  };

//   createTodo("Task 1", "This is task 1");

  const updateTodo = async (id, updates) => {
try {
    const result=await db.collection('todos').updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: updates });
    console.log('Todo updated: ', result.modifiedCount);
    getTodos();

}
catch (error) {
    console.error('Error updating todo: ', error);
}  
}

// updateTodo('66ebf8e80616e9f940d38927', { title: 'Изучить MongoDB', description: 'Начни с CRUD операций' });

const DeleteTodo = async (id) => {
    try {
        const result=await db.collection('todos').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        console.log('Todo deleted: ', result.deletedCount);
        getTodos();
    }
    catch (error) {
        console.error('Error updating todo: ', error);
    }  
    }

    // DeleteTodo('66ebfc11d0635e8a4983171c');