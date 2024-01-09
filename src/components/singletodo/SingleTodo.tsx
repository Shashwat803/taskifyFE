import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model/TodoModel";
import { MdEdit, MdDelete, MdDone } from "react-icons/md";
import "./SingleTodo.css";
import { deleteTodo, markDone, updateTodo } from "../service/TodoApi";


interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ todo, todos, setTodos }: Props) => {

    const [editTodo, seteditTodo] = useState<Boolean>(false)
    const [editTodoInput, seteditTodoInput] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)
  

    const handleDone = async(id:number)=>{
      await markDone(id, {...todo, isDone:!todo.isDone})
      setTodos(todos.map((todo)=>todo._id===id?{...todo,isDone:!todo.isDone}:todo))
    }
    const handleDelete = async(id:number)=>{
       await deleteTodo(id)
       setTodos(todos.filter((todo)=>todo._id!==id))
    }

    const handleEdit = async(e:React.FormEvent, id:number)=>{
        e.preventDefault()
        const response = await updateTodo(id,{todo:editTodoInput})
        console.log(response);
             
      setTodos(todos.map((todo)=>todo._id === id ? {...todo, todo:response.todo}:todo))
      seteditTodo(false)
    }

    useEffect(() => {
     inputRef.current?.focus()
    }, [editTodo])
    

    
  return (
    
      <form className="todo_single" onSubmit={(e)=>handleEdit(e, todo._id)}>
          {
            todo &&
            editTodo?(
           <input type="text" ref={inputRef}  value={editTodoInput} onChange={(e)=> seteditTodoInput(e.target.value)}/>
            ):(
                todo.isDone?(
                    <s className="todo_single--text">{todo.todo}</s>
                ):(
                    <span className="todo_single--text">{todo.todo}</span>
                )
            )
          }

      
        <div>
          <span className="icon" onClick={()=>{
             if(!editTodo && !todo.isDone){
                seteditTodo(!editTodo)
             }
          }}>
            <MdEdit />
          </span>
          <span className="icon" onClick={()=>handleDelete(todo._id)}>
            <MdDelete />
          </span>
          <span className="icon" onClick={()=>handleDone(todo._id)}>
            <MdDone />
          </span>
        </div>
      </form>

  );
};

export default SingleTodo;
