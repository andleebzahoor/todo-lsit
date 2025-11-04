

import { useState, useEffect, useRef } from "react";

const Homepage = () => {
  const [inputs, setInputs] = useState({ todo: "", showfinished: false });
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  //  Load todos from localStorage when page loads
useEffect(() => {
    
    const storedTodos = localStorage.getItem("todos");
    const parsed = storedTodos && storedTodos !== "undefined"? JSON.parse(storedTodos):[];
//     storedTodos && storedTodos !== "undefined"

// Checks that storedTodos is not null and not the string "undefined".
// (Sometimes when you localStorage.setItem("todos", undefined), it literally stores the string "undefined", which would break JSON.parse.)

// JSON.parse(storedTodos)

// Converts the JSON string back into a JavaScript array.ss

// : []

// If the check fails (no todos stored), it returns an empty array.

// So basically, this line ensures that parsed is always an array, whether localStorage has valid data or not.
    setTodos(parsed);
  }, []);

  //  Focus input when editing
  useEffect(() => {
    if (editIndex !== null) {
      inputRef.current.focus();
    }
  }, [editIndex]);

  //  Handle input change (text or checkbox)
  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  //  Save or update todo
  function savetolocalStorage(e) {
    e.preventDefault();

    if (!inputs.todo.trim()) return;

    let updatedTodos;
    if (editIndex !== null) {
      updatedTodos = [...todos];
      updatedTodos[editIndex].text = inputs.todo;
      setEditIndex(null);
    } else {
      updatedTodos = [
        ...todos,
        { text: inputs.todo, completed: false }, // new todo object
      ];
    }

    setTodos(updatedTodos);
    
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // clear input
    setInputs((prev) => ({ ...prev, todo: "" }));
  }

  // 🗑 Delete todo
  function handleDelete(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // ✏ Edit todo
  function handleEdit(index) {
    setInputs((prev) => ({ ...prev, todo: todos[index].text }));
    setEditIndex(index);
  }

  //  Toggle completed state
  function handleToggleComplete(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  //  Filter todos based on "show finished"
  const displayedTodos = todos.map((todo , index)=>({...todo , realindex: index})).filter(
  
    (todo) => inputs.showfinished || !todo.completed
     
  );
      
 

  return (
    <div className="todo md:w-1/2 mx-3 h-auto mt-5 shadow-2xl rounded-md md:m-auto font-sans p-3">
      <h1 className="text-pink-950 text-center font-semibold text-lg">
        iTask - Manage your todos at one Place
      </h1>

      <h2 className="text-pink-900 ml-5 font-bold mt-3">
        {editIndex !== null ? "Edit Todo" : "Add a Todo"}
      </h2>

      <form>
        <input
          type="text"
          name="todo"
          value={inputs.todo}
          onChange={handleChange}
          ref={inputRef}
          className="w-[70%] rounded-md m-5 border border-black outline-none focus:ring-0 px-2 py-1"
        />
        <button
          type="submit"
          onClick={savetolocalStorage}
          className="text-white px-3 py-1 bg-pink-900 border-none rounded-lg hover:bg-pink-700"
        >
          {editIndex !== null ? "Update" : "Save"}
        </button>

        <div className="mx-5">
          <input
            type="checkbox"
            name="showfinished"
            checked={inputs.showfinished}
            onChange= {handleChange}
          />
          <label className="px-2 text-[12px]">Show finished</label>
        </div>
      </form>

      <hr className="w-[90%] border-t border-gray-300 m-auto my-3" />

      <div className="show-todo">
        <h2 className="text-pink-900 ml-5 font-bold">Your Todos</h2>
        <div className="insert-todos">
          {displayedTodos.length === 0 ? (
            <p className="text-gray-500 ml-5">No todos yet!</p>
          ) : ( displayedTodos.map((todo => (
              
              <div
                key={todo.realindex}
                className="flex items-center justify-between bg-gray-100 m-3 p-2 rounded-md"
              >
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.realindex)}
                  />
                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-400 select-none"
                        : "select-none"
                    }
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex gap-2 text-pink-900">
                  <i
                    className="fa-solid fa-pen-to-square cursor-pointer hover:text-pink-700"
                    onClick={() => handleEdit(todo.realindex)}
                  ></i>
                  <i
                    className="fa-solid fa-trash cursor-pointer hover:text-pink-700"
                    onClick={() => handleDelete(todo.realindex)}
                  ></i>
                </div>
              </div>
            ))))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
 