import React from 'react'
import ListView from './ListView'
import { useTaskContext } from '../contextAPI/taskListContext'
import BoardView from './BoardView'
import SearchNotFound from './SearchNotFound'

const BodyTask = () => {

  const {view, searchTaskList} = useTaskContext()

  return (
    <>
    {view ? <ListView /> : <BoardView />  }  
    </>
  )
}

export default BodyTask
