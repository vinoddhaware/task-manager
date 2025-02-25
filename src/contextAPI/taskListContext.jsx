import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getApi, multiDeleteApi, postApi, putApi } from "../api/FirebaseDB";

const TaskList = createContext()

export const TaskProvider = ({children}) =>{

    const [taskList, setTaskList] = useState([])
    const [searchTaskList, setSearchTaskList] = useState([])
    const [selectedTaskId, setSelectedTaskId] = useState([])
    const [search, setSearch] = useState('')
    const [date, setDate] = useState('')
    const [categorySearch, setCategorySearch] = useState('all')
    const [view, setView] = useState(true)   

    // fetching realtime data from firebase
    const fetchTaskList = async() =>{
        try {
            const res = await getApi()
            if(res.status === 200){
                const data = res.data
                for(let key in data){
                    setTaskList((prev) => [...prev, {...data[key], id:key}])
            }
            }
        } catch (error) {
            console.log(error);            
        }
    } 
    
    useEffect(() => {
        fetchTaskList()
    }, [])  

    const filteredTasks = taskList.filter(currData => {
        const matchesSearch = currData.task.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = categorySearch === 'all' || currData.taskCategory === categorySearch;
        const matchesDate = currData.date.includes(date)
        return matchesSearch && matchesCategory && matchesDate
      });
      
    
    //filtering data
    const todo = filteredTasks.filter((currData) => currData.taskStatus === "TO-DO")
    const inProgress = filteredTasks.filter((currData) => currData.taskStatus === "IN-PROGRESS")
    const completed = filteredTasks.filter((currData) => currData.taskStatus === "COMPLETED")

    //get checked data for deleting data
    const handleCheckbox = (e) =>{
        const {value, checked} = e.target
        if(checked){
            setSelectedTaskId([...selectedTaskId, value])
            // setSelectedTaskId((prev) => [...prev, value])
        }else{
            setSelectedTaskId((prev) => prev.filter((id) => id != value))
        }        
    }   

    //select all data
    const handleAllCheckbox = () =>{
        if(taskList.length === selectedTaskId.length){
            setSelectedTaskId([])
        }else{
            let allIds = taskList?.map((currData) => currData.id)
            setSelectedTaskId(allIds)
        }    
    }
    
    //deleting multiple data
    const handleDelete2 = async(id) =>{
        try {
            const res = await multiDeleteApi(selectedTaskId)
            // await Promise.all(res);                        
                const updatedTask = taskList.filter((currTasks) => {
                    return !id.includes(currTasks.id)
                })                
                const updatedSelectedTaskId = updatedTask.filter((currTasks) => {
                    return id.includes(currTasks.id)
                })    
                // setTaskList(prev => prev.filter(task => !selectedTaskId.includes(task.id)));
                setTaskList(updatedTask)        
                setSelectedTaskId(updatedSelectedTaskId)        
        } catch (error) {
            console.log(error);
        }       
    }

    //getting ids of status
    const handleSelectAllStatus = (selectAllStatus) =>{
        switch (selectAllStatus) {
            case 'TO-DO':
                if(todo.length === selectedTaskId.length){
                    return  setSelectedTaskId([])
                }else{
                    let allIds = todo?.map((currData) => currData.id)
                    return setSelectedTaskId(allIds)
                }        
            case 'IN-PROGRESS':
                if(inProgress.length === selectedTaskId.length){
                    return  setSelectedTaskId([])
                }else{
                    let allIds = inProgress?.map((currData) => currData.id)
                    return setSelectedTaskId(allIds)
                }        
            case 'COMPLETED':
                if(completed.length === selectedTaskId.length){
                    return  setSelectedTaskId([])
                }else{
                    let allIds = completed?.map((currData) => currData.id)
                    return setSelectedTaskId(allIds)
                }        
            default:
                break;
        }
    }

    //Drag and drop implementation
    const dragData = useRef()
    const dragId = useRef()
    
    const handleDragStart = (e, data, id) =>{
        e.target.style.opacity = '0.4'
        dragData.current = data
        dragId.current = id      
    }

    const handleDragEnd =(e) =>{
        e.target.style.opacity = '1'
    }

    const handleDrop = async(e, status) =>{
        const dropData = dragData.current
        const dropId = dragId.current
        console.log(dropData);
        console.log(dropId);
        const updatedTask = taskList.filter((currTask) => currTask.id !== dropId)
        updatedTask.push({...dropData, status:status})
        console.log(updatedTask)  
        setTaskList(updatedTask)
        // try {
        //     const res = await postApi(...updatedTask)
        //     if(res.status === 200){
        //         location.reload()
        //     }     
        // } catch (error) {
        //     console.log(error);           
            
        // }

    }

    return <TaskList.Provider value={{date, setDate, taskList, setTaskList, searchTaskList, setSearchTaskList, todo, inProgress, completed, view, setView, search, setSearch,categorySearch, setCategorySearch, selectedTaskId, setSelectedTaskId, handleCheckbox, handleAllCheckbox, handleDelete2, handleSelectAllStatus, handleDrop, handleDragStart, handleDragEnd}} > {children} </TaskList.Provider>
}

// custome hook
export const useTaskContext = () => useContext(TaskList)
