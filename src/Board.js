import React, {useState} from 'react';
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import './App.css';
import './AddCard.css'



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
    const sortAlphabet = () => {
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
                        borderRadius: 10,
                        textAlign: "center"


                    }}
                >Board {props.status}</h2>


                <Droppable key={uuidv4()} droppableId={String(props.indexStatus)}>
                    {(provided, snapshot) => (

                        <div className='cardsContainer'
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
                    <span className="dropdown">
                        <button className="dropbtn" onClick={changeAddCard}>Add card</button>
                    </span>
                }
                <div className="dropdown">
                    <button className="dropbtn">Sort by...</button>
                    <div className="dropdown-content">
                        <button onClick={sortAlphabet}>Alphabet</button>
                        <button onClick={sortDataTimeNew}>Time(first new)</button>
                        <button onClick={sortDataTimeOld}>Time(first old)</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Board;




