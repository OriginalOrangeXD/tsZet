import React, {useState} from 'react';
import './App.css';
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import {Todo} from "./model"
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


function App() {

    const [todo, setTodo] = useState<string>("");
    const [todos,setTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if(todo){
            setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}]);
            setTodo("");
        }
    };

    console.log(todo);
    console.log(todos);
    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result;
        
        if(!destination){ return};

        if (
            destination.droppableId ===source.droppableId &&
            destination.index ===source.index
        ) {return };
        let add;
        let active=todos;
        let completed=completedTodos;
        if (source.droppableId === "TodosList") {
            add = active[source.index];
            active.splice(source.index,1);
        } else {
            add = completed[source.index];
            completed.splice(source.index,1);
        }

        if (destination.droppableId === "TodosList") {
            active.splice(destination.index, 0,add);
        }else {
            completed.splice(destination.index, 0,add);
        }
        setCompletedTodos(completed);
        setTodos(active);
    };

    const [isModalVisable, setIsModalVisable] = useState(true);

    const toggleLogin = () => {
        setIsModalVisable(wasModalVisable => !wasModalVisable);
    }

    return (
        <DragDropContext 
            onDragEnd={onDragEnd}>
        <div className="App">
            <div className="white bar">
            <span className="heading">Zettelkasten</span>
            </div>
            <span className="byName">By:Robert DeAngelis</span>
            <div id="wrapper">
                <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
                <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
            </div>
        </div></DragDropContext>
        );
};

export default App;
