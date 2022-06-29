import React, { useState,useRef, useEffect } from 'react';
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd'
import './styles.css'

type Props = {
    index:number,
    todo:Todo,
    todos:Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos:Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodo: React.FC<Props> = ({todo, todos,setTodos, completedTodos,setCompletedTodos, index}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    
    const handleDone = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        for(var todo of todos){
            if(id === todo.id) {
                setCompletedTodos(completedTodos.concat(todo));
            }
        }
    };
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setCompletedTodos(todos.filter((todo) => todo.id !== id));
    };
    const handleEdit = (e:React.FormEvent,id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => todo.id===id?{...todo,todo:editTodo}:todo));
        setEdit(false);
        }
    const inRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inRef.current?.focus();},[edit])

        return (
                <Draggable draggableId={todo.id.toString()} index={index}>
                { (provided,snapshot) => (
                        <form className={`todos__single ${snapshot.isDragging}? "drag":""`} onSubmit={(e)=> handleEdit(e,todo.id)} {...provided.draggableProps} {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        {edit ? (
                                <input value={editTodo} ref={inRef} onChange={(e)=> setEditTodo(e.target.value)} className="todos__single--text"/>
                                ): (
                                    <span className="todos__single--text">{todo.todo}</span>
                                   )
                        }
                        <div>
                            <span className="icon" onClick={() => 
                                {if (!edit && !todo.isDone){
                                    setEdit(!edit);
                                    }
                                    }
                                }><AiFillEdit />
                            </span>
                            <span className="icon" onClick={()=>handleDelete(todo.id)}>
                            <AiFillDelete />
                            </span>
                            <span className="icon" onClick={()=>handleDone(todo.id)}>
                            <MdDone />
                            </span>
                        </div>
                        </form>
                        )
                }
        </Draggable>
        );
};
export default SingleTodo;
