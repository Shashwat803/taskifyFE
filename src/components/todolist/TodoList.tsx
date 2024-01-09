import React from 'react'
import { Todo } from '../model/TodoModel'
import './TodoList.css'
import SingleTodo from '../singletodo/SingleTodo'
interface Props {
    todos: Todo[]
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList = ({todos, setTodos}:Props) => {
  return (
    <div className='todos'>
     {
        todos.map((todo)=>(
        <SingleTodo key={todo._id} todo={todo} todos={todos} setTodos={setTodos} />
        ))
     }
    </div>
  )
}

export default TodoList