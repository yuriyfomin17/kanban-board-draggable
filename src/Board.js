import React, {useState} from 'react';
import Task from "./Task";
import styled from "styled-components";
import {Droppable, Draggable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import index from "styled-components/dist/styled-components-macro.esm";

const Container = styled.div`
    margin:10px;
    border:1px solid lightgrey;
    border-radius:10px;
    
`;

const invisibleContainer = styled.div`
    margin:10px;
    border:1px solid lightgrey;
    border-radius:10px;

`
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
        <div style={{
            display: 'flex', flexDirection: "column", alignItems: "center"
        }}>

            <div style={{margin: 8}}>
                <Droppable key ={uuidv4()} droppableId={String(props.index)}>
                    {(provided, snapshot) => (

                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                                background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                padding: 4,
                                width: 250,
                                minHeight: 500,


                            }}
                        >
                            <h2>Board {props.status}</h2>

                            {
                                props.tasks
                                    .filter((el) => el.status === props.status)
                                    .map((el,index) => <Task
                                        index={index}
                                        key={el.id}
                                        el={el}
                                        deleteTask={props.deleteTask}
                                        editTask={props.editTask}
                                    />)
                            }
                        </div>
                    )}


                </Droppable>
            </div>
        </div>

    );
}

export default Board;




