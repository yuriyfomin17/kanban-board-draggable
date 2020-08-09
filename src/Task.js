import React, {useState} from 'react';
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';


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
        <div>
            <Draggable key={uuidv4()} draggableId={props.el.id} index={props.index}>
                {(provided, snapshot) => (
                    <div key={props.el.id}
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         style={{
                             userSelect: "none",
                             padding: 16,
                             margin: "0 0 8px 0",
                             minHeight: "50px",
                             backgroundColor: snapshot.isDragging
                                 ? "#263B4A"
                                 : "#456C86",
                             color: "white",
                             ...provided.draggableProps.style
                         }}
                    >
                        {props.el.title}
                        {provided.placeholder}
                    </div>

                )}

            </Draggable>

        </div>
    );
}

export default Task;




