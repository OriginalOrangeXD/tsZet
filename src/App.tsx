import React, {useState} from 'react';
import './App.css';
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import {Todo} from "./model"


function App() {

    const [todo, setTodo] = useState<string>("");
    const [todos,setTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if(todo){
            setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}]);
            setTodo("");
        }
    };

    console.log(todo);
    console.log(todos);

    return (
        <div className="App">
            <span className="heading">Zettle</span>
            <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <TodoList todos={todos} setTodos={setTodos}/>

        </div>
        );
}

export default App;
