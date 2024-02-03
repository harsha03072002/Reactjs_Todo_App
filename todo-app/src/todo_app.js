import React, { useState } from "react";

const TodoApp = ()=>{
    
    const [list,setList] = useState([])
    const [message,setMessage] = useState({
        id:"",
        text:""
    })
    const [editMessage,setEditMessage]= useState({
        id : "",
        isEditEnable: false 
    })

    const handleSubmit =(e)=>{
        e.preventDefault() ;
        const todo={
            id : new Date().getTime().toString(),
            text : message.text
        }
        //console.log(todo)
        setList(
            [
                ...list,
                todo]
        )

        setMessage(
            {
                id:"",
                text:""
            }
        )
        
    }

    const changeInput = (e)=>{
        setMessage({
            ...message,
            text : e.target.value
        })
    }

    const deleteItem =(comingId)=>{
        const afterItems = list.filter((eachObj)=>{
                                return eachObj.id!== comingId;
                            })
        //console.log(afterItems)
        setList(afterItems)
    }

    const editTextFunction=(id)=>{
        setEditMessage({
            ...editMessage,
            id:id,
            isEditEnable:true
        });
        let editingObj = list.find((eachObj)=>{
            return eachObj.id === id;
        })
        console.log(editingObj)
        setMessage({
            ...message,
            id :editingObj.id,
            text : editingObj.text

        })
        
    }

    const formEditButton = (e)=>{
        e.preventDefault()
        const todoFinalEdit = list.map((everyObj)=>{
            if ( everyObj.id === editMessage.id){
                return {
                    id : editMessage.id,
                    text: message.text
                }
            }else{
                return everyObj;
            }
        })
        setList(todoFinalEdit)
        setEditMessage({
            ...editMessage,
            id:"",
            isEditEnable:false
        })
        setMessage({
            id:"",
            text:""
        });
        
    }

    return(
        <div className="container">
            <h1 className="todo-heading">Todo List</h1>
            <form className="form">
                <input id="message" type="text" placeholder="type..." value={message.text} onChange={changeInput} ></input>
                {editMessage.isEditEnable ? <button  type="submit" onClick={formEditButton}>Edit</button>:<button type="submit" onClick={handleSubmit}>Add</button>}
            </form> 
            {
                list.length ===0 && <h1 className="no-items-message">There are no items in the list !</h1>
            }
            <div>
                <ul className="ul_body">
                {list.map((everyObj)=>{
                    const{id,text}=everyObj
                    return(
                        
                            <li key={id} className="list_items">
                            <span>{text}</span>
                            <button onClick={()=>editTextFunction(id)}>edit</button>
                            <button onClick={()=>deleteItem(id)}>Delete</button>
                            </li>     
                    )
                })}
                </ul>
            </div>
        </div>
    )
}

export default TodoApp;