import React, {useState} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import styled from "styled-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import index from "styled-components/dist/styled-components-macro.esm";


const initialTasks = [
    {
        id: uuidv4(),
        title: "1",
        priority: 0,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "2",
        priority: 1,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "3",
        priority: 2,
        status: 'todo'
    },
    {
        id: uuidv4(),
        title: "4",
        priority: 3,
        status: 'review'
    },

]
const statuses = ['todo', 'progress', 'review', 'done']
const order = [{todo:[0,1,2]}, {progress:[]}, {review:[3]}, {done:[]}]

function App() {
    const [tasks, setTasks] = useState(initialTasks)
    const [statusData, setStatus] = useState(statuses)
    const [statusOrder, setStatusOrder] = useState(order)
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
            const copiedData = tasks.slice()
            const column = statuses[source.droppableId]
            const [removed] = copiedData.splice(result.source.index, 1)
            console.log(result.source.index)
            console.log(copiedData)
            console.log(result.destination.index)
            copiedData.splice(result.destination.index, 0, removed)



            setTasks(copiedData)

        } else {
            const columnSource = statuses[source.droppableId]

            console.log(columnSource)

            console.log(result.destination.index)

            const copiedData = tasks.slice()
            const columnDestination = statuses[destination.droppableId]
            const draggableIndex = copiedData.findIndex(el=>el.id===result.draggableId)
            const draggableItem = copiedData.find(el=>el.id===result.draggableId)
            const [removed] = copiedData.splice(draggableIndex, 1)
            removed.status = columnDestination
            console.log(removed)
            console.log(copiedData)
            copiedData.splice(result.destination.index, 0, removed)
            setTasks(copiedData)
            console.log(copiedData)

            /*if(result.destination.index===0){
                const copiedData = tasks.slice()
                const draggableItem = copiedData.find(el=>el.id===result.draggableId)
                const draggableIndex = copiedData.findIndex(el=>el.id===result.draggableId)
                const columnDestination = statuses[destination.droppableId]
                console.log(draggableItem)
                console.log(columnDestination)
                draggableItem.status = columnDestination
                console.log(draggableItem)
                copiedData[draggableIndex]=draggableItem
                setTasks(copiedData)
            }*/



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
                        statusData.map((status, index) => <Board
                            indexStatus={index}
                            key={index}
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




