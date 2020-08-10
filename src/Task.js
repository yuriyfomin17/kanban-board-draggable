import React from 'react';

import {Draggable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import EditTitle from "./EditTitle";


function Task(props) {
    const deleteItem = () => {
        props.deleteTask(props.indexStatus, props.el.id)
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
                        <EditTitle el={props.el} editTask={props.editTask} indexStatus={props.indexStatus}/>
                        <button onClick={deleteItem}>Delete</button>
                        {provided.placeholder}
                    </div>

                )}


            </Draggable>


        </div>
    );
}

export default Task;




