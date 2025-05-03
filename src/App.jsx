import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setShowfinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  //*Function to add a todo
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };

  //*Function to edit a todo
  const handleEdit = (e, id) => {
    const todo = todos.filter((i) => i.id === id);
    setTodo(todo[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  //*Function to delete a todo
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (params) => {
    setShowfinished(!showfinished);
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-6 rounded-2xl p-5 bg-blue-300 border-none focus:outline-none focus:shadow-outline leading-tight text-shadow-black min-h-[80vh]">
        <div className="addTodo">
          <h2 className="text-3xl font-bold m-3">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="h-9 p-3 rounded-sm bg-blue-100 text-xl w-2xl transition-all m-3"
            placeholder="Enter your text here"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length === 0 ? true : false}
            className="bg-blue-700 p-2 h-9 m-3 rounded-md hover:bg-blue-950 text-white transition-all text-xl"
          >
            <FaSave />
          </button>
        </div>
        <div className="flex">
          <input
            className="size-5 m-3"
            type="checkbox"
            checked={showfinished}
            onChange={toggleFinished}
          />{" "}
          <div className="my-1.5 mx-2 text-2xl">Show Finished</div>
        </div>
        <h2 className="text-3xl font-bold m-3">List of Todos</h2>
        <div className="todos w-full">
          {todos.length === 0 && (
            <div className="text-2xl px-2 m-2 font-serif bg-blue-200">
              <i>No Todos to display</i>
            </div>
          )}
          {todos.map((item) => {
            return (
              (showfinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo m-2 flex w-full justify-between bg-blue-200 text-blue-950 text-2xl"
                >
                  <div className="flex justify-between">
                    <input
                      className="m-5 size-5 flex"
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className="px-3 h-9 m-3 text-2xl">{item.todo}</div>
                  </div>
                  <div className=" flex btns">
                    <div className="m-3 rounded-md p-0.5">
                      {item.isCompleted ? "✔️" : "❌"}
                    </div>
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-blue-700 p-1 px-3 h-9 m-3 rounded-md hover:bg-blue-950 text-white transition-all text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      name={item.id}
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-blue-700 p-1 px-3 h-9 m-3 rounded-md hover:bg-blue-950 text-white transition-all text-xl"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
