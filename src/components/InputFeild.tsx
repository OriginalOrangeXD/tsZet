import React, { useRef } from 'react'
import "./styles.css";

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({todo, setTodo, handleAdd}) => {
        const inputRef = useRef<HTMLInputElement>(null);

        return (
        <div className="inContainer">
        <form className='input' onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur();
        }}>
            <input type='input' 
                ref={inputRef}
                value={todo}
                onChange={
                    (e)=>setTodo(e.target.value)
                }
                placeholder=" " className="input__box"/>
                <span></span>
        </form>
        </div>
        )
}

export default InputFeild
