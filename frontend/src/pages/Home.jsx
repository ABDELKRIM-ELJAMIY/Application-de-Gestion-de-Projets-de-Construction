import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Edit, Eye, Trash2 } from 'lucide-react';

const Home = () => {
  
  const projects =[  {
      id: 1,
      name: 'Project A',
      description: 'Description of Project A',
      startDate: '2025-03-01',
      endDate: '2025-06-01',
      budget: 50000,
    },
    {
      id: 2,
      name: 'Project B',
      description: 'Description of Project B',
      startDate: '2025-04-01',
      endDate: '2025-08-01',
      budget: 60000,
    },
    {
      id: 2,
      name: 'Project B',
      description: 'Description of Project B',
      startDate: '2025-04-01',
      endDate: '2025-08-01',
      budget: 60000,
    },
    {
      id: 2,
      name: 'Project B',
      description: 'Description of Project B',
      startDate: '2025-04-01',
      endDate: '2025-08-01',
      budget: 60000,
    },
    {
      id: 2,
      name: 'Project B',
      description: 'Description of Project B',
      startDate: '2025-04-01',
      endDate: '2025-08-01',
      budget: 60000,
    },
    {
      id: 2,
      name: 'Project B',
      description: 'Description of Project B',
      startDate: '2025-04-01',
      endDate: '2025-08-01',
      budget: 60000,
    },
  ]
  

  
 

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#003f6b] ">Project Management</h1>
        <Link
          to="/add-project"
          className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Eye size={18} />
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#dc4048]">
            <h2 className="text-xl font-semibold text-[#003f6b]">{project.name}</h2>
            <p className="text-gray-700 mt-2">{project.description}</p>

            <div className="my-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2 text-[#7acdf1]" />
                <span>Start: {project.startDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2 text-[#7acdf1]" />
                <span>End: {project.endDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign size={16} className="mr-2 text-[#feb913]" />
                <span>Budget: ${project.budget.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                // to={`/tasks/${project.id}`}  
                to={`/tasks/`}  

                className="bg-[#7acdf1] hover:bg-[#5ba6d8] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Eye size={16} />
                View Tasks
              </Link>

              <Link
              
                className="bg-[#feb913] hover:bg-[#f6821f] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Edit size={16} />
                Edit
              </Link>
              <button
                className="bg-[#dc4048] hover:bg-[#c63038] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;