import React, {useState} from 'react';
import styled from "styled-components";

;

const Container = styled.div`
    margin:10px;
    border:1px solid lightgrey;
    border-radius:10px;
      
`;
const TaskList = styled.div`
    padding: 8px;
`

function Task(props) {
    const [inputValue, setInput] = useState(props.el.title)
    const [editBut, setEdit] = useState(true)
    const changeBut = () => {
        setEdit(!editBut)
    }
    const changeInput = (e) => {
        setInput(e.target.value)
    }
    const editTask = () => {
        if (inputValue !== "") {
            props.editTask(props.el.id, inputValue)
            setEdit(!editBut)
        }
    }
    return (
        <>
            <Container>
                <TaskList>
                    {editBut ? props.el.title : ""}
                    {editBut ? <button onClick={changeBut}>Edit</button> :
                        <input value={inputValue} onChange={changeInput}/>}
                    {editBut ? <button onClick={() => props.deleteTask(props.el.id)}>
                        Delete
                    </button> : <button onClick={editTask}>Save</button>}

                </TaskList>

            </Container>

        </>
    );
}

export default Task;




