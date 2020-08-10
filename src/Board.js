import React, {useState} from 'react';
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';


function Board(props) {
    const [addCardBut, setBut] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [sortMenuBar, setMenuBar] = useState(false)
    const toggleMenu = () => {
        setMenuBar(!sortMenuBar)
    }
    const changeAddCard = () => {
        if (addCardBut === false) {
            setBut(!addCardBut)
        }

        if (addCardBut === true && inputValue !== '') {
            setBut(!addCardBut)
            props.addTask(props.indexStatus, inputValue)
            setInputValue('')
        }

    }
    const setInput = (e) => {
        setInputValue(e.target.value)

    }
    const sortDataTimeOld = () => {
        props.sortDataAlphabetically(props.indexStatus, "TimeOLD")
    }
    const sortDataTimeNew = () => {
        props.sortDataAlphabetically(props.indexStatus, "TimeNew")
    }
    const sortDataTimeAlphabet = () => {
        props.sortDataAlphabetically(props.indexStatus, "Alphabet")
    }

    return (
        <div style={{
            display: 'flex', flexDirection: "column", alignItems: "center"
        }}>

            <div style={{margin: 8}}>
                <h2
                    style={{
                        background: 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 1,

                    }}
                >Board {props.status}</h2>


                <Droppable key={uuidv4()} droppableId={String(props.indexStatus)}>
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
                                props.tasks.map((el, index) => <Task
                                    key={el.id}
                                    el={el}
                                    index={index}
                                    deleteTask={props.deleteTask}
                                    editTask={props.editTask}
                                    indexStatus={props.indexStatus}

                                />)
                            }
                            {provided.placeholder}
                        </div>
                    )}


                </Droppable>

                {addCardBut ? <input value={inputValue} onChange={setInput}/> : ''}
                {addCardBut ? <button onClick={changeAddCard}>Save</button> :
                    <button onClick={changeAddCard}>Add cart</button>}
                <>
                    <button>Sort by...</button>

                </>
            </div>
        </div>

    );
}

export default Board;




