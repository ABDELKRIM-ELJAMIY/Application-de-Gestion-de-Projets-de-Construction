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
import AddResource from "./pages/AddResource";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/tasks/add/:projectId" element={<AddTask />} />
        <Route path="/projects/edit/:id" element={<EditProject />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
        <Route path="/resources/task/:taskId" element={<ResourcesList />} />
        <Route path="/resources/add/:id" element={<AddResource />} />
        {/* <Route path="/resources/edit/:resourceId" element={<EditResource />} /> */}
        <Route path="/resources/edit/:taskId/:resourceId" element={<EditResource />} />
        <Route path="/project/:projectId/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
