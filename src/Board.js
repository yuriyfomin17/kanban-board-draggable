import React, {useState} from 'react';
import Task from "./Task";
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';

const Container = styled.div`
    
    margin:10px;
    border:1px solid lightgrey;
    border-radius:10px;
    
`;
const Title = styled.h3`
    padding: 8px;
`

function Board(props) {
    const [addCardBut, setBut] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const changeAddCard = () => {
        if (addCardBut === false) {
            setBut(!addCardBut)
        }

        if (addCardBut === true && inputValue !== '') {
            setBut(!addCardBut)
            props.addTask(props.status, inputValue)
            setInputValue('')
        }

    }
    const setInput = (e) => {
        setInputValue(e.target.value)

    }

    return (
        <Draggable key={uuidv4()} draggableId={props.status} index={props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDragging}


                >


                    <Title>Board {props.status}</Title>
                    {
                        props.tasks
                            .filter(el => el.status === props.status)
                            .map(el => <Task
                                key={el.id}
                                el={el}
                                deleteTask={props.deleteTask}
                                editTask={props.editTask}
                            />)
                    }

                    {addCardBut ? <input value={inputValue} onChange={setInput}/> : ''}
                    <button onClick={changeAddCard}>Add card</button>

                </Container>


            )}

        </Draggable>

    );
}

export default Board;




