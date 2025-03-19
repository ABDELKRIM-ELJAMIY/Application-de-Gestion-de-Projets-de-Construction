import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

const Tasks = () => {
  const tasks =[
    {
      id: 1,
      name: 'Task A',
      description: 'Description of Task A',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'In Progress',
    },
    {
      id: 2,
      name: 'Task B',
      description: 'Description of Task B',
      startDate: '2025-04-01',
      endDate: '2025-04-15',
      status: 'Not Started',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#003f6b]">Gestion des Tâches</h1>
        <Link
          to="/tasks/add"
          className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={18} />
          Nouvelle Tâche
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#dc4048]">
            <h2 className="text-xl font-semibold text-[#003f6b]">{task.name}</h2>
            <p className="text-gray-700 mt-2">{task.description}</p>

            <div className="my-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <span className="font-semibold">Start: </span>
                <span>{task.startDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold">End: </span>
                <span>{task.endDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold">Status: </span>
                <span>{task.status}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`tasks/edit`}
                className="bg-[#feb913] hover:bg-[#f6821f] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Edit size={16} />
              
              </Link>
              <button
                className="bg-[#dc4048] hover:bg-[#c63038] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Trash2 size={16} />
                
              </button>
              <Link
                to={`/resources`}
                className="bg-[#3afe13] hover:bg-[#f6821f] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Eye size={16} />

              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
