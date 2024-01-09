import React, { useEffect, useState } from "react";
import "./Home.css";
import { Todo } from "../model/TodoModel";
import { createTodo, getAllTodos } from "../service/TodoApi";
import InputField from "../input/InputField";
import TodoList from "../todolist/TodoList";
import { currentUser, logoutUser } from "../service/authservice/AuthAPI";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<any>()
  const navigate = useNavigate();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const response = await createTodo({ todo, isDone: false });
      setTodos([...todos, response]);
      setTodo("");
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getAllTodos();
      setTodos(response);
    })();

    (async () => {
      const response = await currentUser();
      setUser(response?.data.user.username)
    })();
  }, []);

  const logout = ()=>{
    logoutUser()
    navigate('/login')
    window.location.reload()
  }

  return (
    <>
    <div className="logout">
      <button className="logoutBtn" onClick={logout}>
        Log Out
      </button>
    </div>
    <div className="App">
      <span className="heading">{user &&user.toUpperCase()}'s TASKIFY</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
    </>
  );
};

export default Home;
