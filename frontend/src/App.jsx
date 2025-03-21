import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";
import EditProject from "./pages/EditProject";
import EditResource from "./pages/EditResource";
import EditTask from "./pages/EditTask";
import ResourcesList from "./pages/ResourcesList";
import Tasks from "./pages/Tasks";
// import Projects from "./pages/Projects";
// import TaskResources from "./pages/TaskResources";
import AddResource from "./pages/AddResource";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/projects/edit" element={<EditProject />} />
        <Route path="/resources/edit" element={<EditResource />} />
        <Route path="/tasks/edit" element={<EditTask />} />
        <Route path="/resources" element={<ResourcesList />} />
        <Route path="/resources/add" element={<AddResource />} />
        <Route path="/tasks" element={<Tasks />} />
        {/* <Route path="/taskresources" element={<TaskResources />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
