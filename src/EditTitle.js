import React, {useState} from 'react';


function EditTitle(props) {
    const [inputValue, setInput] = useState(props.el.title)
    const [editBut, setEditBut] = useState(true)
    const changeEdit = () => {
        setEditBut(!editBut)
    }
    const changeSave = () => {
        props.editTask(props.indexStatus, props.el.id, inputValue)
        setEditBut(!editBut)
    }

    return (
        <>

                {editBut ? props.el.title : <input value={inputValue} onChange={e => setInput(e.target.value)}/>}
                {editBut ? <button onClick={changeEdit}>Edit</button> : <button onClick={changeSave}>Save</button>}

        </>
    );
}

export default EditTitle;




