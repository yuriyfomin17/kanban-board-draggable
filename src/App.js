import React, {useState} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import styled from "styled-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import index from "styled-components/dist/styled-components-macro.esm";

const initialTasks = [
    {
        0: [{
            id: uuidv4(),
            title: "1",
            priority: 1,
        }, {
            id: uuidv4(),
            title: "2",
            priority: 1,
        },{
            id: uuidv4(),
            title: "3",
            priority: 2,
        }]
    },
    {
        1:[]
    },
    {
        2:[]
    },
    {
        3:[
            {
                id: uuidv4(),
                title: "4",
                priority: 3,
                status: 'review'
            },
        ]
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
        if (destination.droppableId === source.droppableId) {
            const copiedTasks = tasks.slice()
            const tasksArr = copiedTasks[destination.droppableId][destination.droppableId]
            const [removed] = tasksArr.splice(result.source.index,1)
            tasksArr.splice(result.destination.index,0,removed)
            console.log(copiedTasks)
            setTasks(copiedTasks)
        } else {
            console.log(source.droppableId)
            console.log(destination.droppableId)
            const copiedTasks = tasks.slice()
            const tasksArr = copiedTasks[source.droppableId][source.droppableId]
            const [removed] = tasksArr.splice(result.source.index,1)
            console.log(removed)
            console.log(copiedTasks)
            console.log(copiedTasks[destination.droppableId][destination.droppableId])
            copiedTasks[destination.droppableId][destination.droppableId].splice(result.destination.index,0,removed)
            console.log(copiedTasks)
            setTasks(copiedTasks)

        }


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
                        tasks.map((el, index) => <Board
                            indexStatus={index}
                            key={index}
                            status={statuses[index]}
                            tasks={el[String(index)]}
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




