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
                <h2
                    style={{
                        background:  'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 1,

                    }}
                >Board {props.status}</h2>
                <Droppable key ={uuidv4()} droppableId={String(props.indexStatus)}>
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


                            {
                                props.tasks.map((el,index) => <Task
                                        key={el.id}
                                        el={el}
                                        index={index}
                                        deleteTask={props.deleteTask}
                                        editTask={props.editTask}
                                    />)
                            }
                            {provided.placeholder}
                        </div>
                    )}


                </Droppable>
            </div>
        </div>

    );
}

export default Board;




