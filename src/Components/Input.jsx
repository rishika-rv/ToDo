import { useEffect, useState } from "react"
import "./input.css"
export default function Input(){
    const[task,setTask]=useState("")
    const[tasks,setTasks]=useState([])

    useEffect(()=>{
        const AllTask=JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(AllTask)
    },[])




    function handleSubmit(event){
        console.log(task)
        event.preventDefault();
        if (task.trim() === "") return;
        const newTask=[...tasks,{text:task,done:false}]
        setTasks(newTask);
        localStorage.setItem("tasks",JSON.stringify(newTask))
        setTask("")   
    }

    function Done(index){
        const updatedtask=[...tasks]
        updatedtask[index].done=! updatedtask[index].done;
        setTasks(updatedtask)
        localStorage.setItem("tasks", JSON.stringify(updatedtask))

    }

    function Delete(index){
        const updatedtask=tasks.filter((el,i)=>i!==index)
        setTasks(updatedtask)
    }

    return<div className="todo">
        <h2>To - Do List</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" value={task} placeholder="Enter your task" onChange={(e) => setTask(e.target.value)}></input>
        <button className="add">ADD</button>
    </form>
    <h3>YOUR TASKS:</h3>
     <ul>
        {tasks.map((t,index)=>
        <li key={index}><span style={{ textDecoration: t.done ? "line-through" : "none" }}>
         {t.text}
        </span>
        <div className="btn"> 
        <button id="done" onClick={()=>Done(index)}>DONE</button>
        <button id ="delete" onClick={()=>Delete(index)}>DELETE</button>
        </div>

        </li>
    )
         }
     </ul>
     
    </div>
}
