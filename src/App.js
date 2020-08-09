import React, {useState} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import styled from "styled-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";


const initialTasks = [
    {
        id: uuidv4(),
        title: "1",
        priority: 1,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "2",
        priority: 2,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "3",
        priority: 3,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "4",
        priority: 4,
        status: 'review'
    }
]
const statuses = ['todo', 'progress', 'review', 'done']

function App() {
    const [tasks, setTasks] = useState(initialTasks)
    const [statusData, setStatus] = useState(statuses)
    const deleteTask = (ID) => {
        const copiedTasks = tasks.slice()
        const index = copiedTasks.findIndex((el) => el.id === ID)
        copiedTasks.splice(index, 1)
        setTasks(copiedTasks)
    }
    const editTask = (ID, title) => {
        const copiedTasks = tasks.slice()
        const index = copiedTasks.findIndex((el) => el.id === ID)
        copiedTasks[index].title = title
        setTasks(copiedTasks)

    }
    const addTask = (status, title) => {
        const copiedTasks = tasks.slice()
        const statusSortedArr = copiedTasks.filter((el) => el.status === status)
        const priorityArr = [];
        statusSortedArr.map(el => priorityArr.push(el.priority))
        const lowestPriority = Math.max(...priorityArr)
        const newElement = {id: uuidv4(), title: title, priority: lowestPriority, status: status}
        copiedTasks.push(newElement)
        setTasks(copiedTasks)
    }
    const onDragEnd = (result) => {
        const {source, destination} = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const copiedData = tasks.slice()
        const column = statuses[source.droppableId]
        const draggableItem = copiedData.find(el=>el.id===result.draggableId)
        console.log(column)
        console.log(draggableItem)


    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div
                    style={{
                        display: 'flex', flexDirection: "row", alignItems: "top"
                    }}

                >
                    {
                        statusData.map((status, index) => <Board
                            index={index}
                            key={status}
                            status={status}
                            tasks={tasks}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            addTask={addTask}
                        />)
                    }
                </div>


            </DragDropContext>
        </div>

    );
}


const Container = styled.div`
display:flex;


`;

export default App;




