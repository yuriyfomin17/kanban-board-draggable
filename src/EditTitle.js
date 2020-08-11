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
        <span>

                {editBut ? props.el.title : <input value={inputValue} onChange={e => setInput(e.target.value)}/>}
                {editBut ? <span onClick={changeEdit}>{props.editBut}</span> : <button onClick={changeSave}>Save</button>}

        </span>
    );
}

export default EditTitle;




