import React, {useState} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import styled from "styled-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";


const initialTasks = [
    {
        id: uuidv4(),
        title: "First Task",
        priority: 1,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "First Task",
        priority: 2,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "First Task",
        priority: 3,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "Second Task",
        priority: 3,
        status: 'review'
    }
]
const statuses = ['todo', 'progress', 'review', 'done']

function App() {
    const [tasks, setTasks] = useState(initialTasks)
    const [statusData, setStatus]=useState(statuses)
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
        if (!result.destination) {
            return;
        }
        const copiedData = statusData.slice()
        const itemDestination = copiedData[result.destination.index]
        copiedData[result.destination.index]= copiedData[result.source.index]
        copiedData[result.source.index]=itemDestination
        setStatus(copiedData)


    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={uuidv4()}>
                {(provided, snapshot) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
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

                    </Container>
                )}
            </Droppable>


        </DragDropContext>

    );
}


const Container = styled.div`
    display:flex;
    
    
`;

export default App;




