import React from 'react'
import NavBar from './components/NavBar'
import Home from './Home'
import AddProject from './AddProject'
import AddTask from './AddTask'
import EditProject from './EditProject'
import EditResource from './EditResource'
import EditTask from './EditTask'
import ResourcesList from './ResourcesList'
import Tasks from './Tasks'
import TaskResources from './TaskResources'


function App() {
  return (
    <>
      <NavBar />
      <Home/>
      <AddProject />
      <AddProject />
      <AddTask />
      <EditProject />
      <EditResource />
      <EditTask />
      <ResourcesList />
      <Tasks />
      <TaskResources/>

    </>

  )
}

export default App