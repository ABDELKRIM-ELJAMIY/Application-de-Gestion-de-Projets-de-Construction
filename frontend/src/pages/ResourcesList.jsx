import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { Edit, Trash2, Plus } from 'lucide-react';
import axios from 'axios';

const ResourcesList = () => {
  const [resources, setResources] = useState([]); 
  const { taskId } = useParams();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/resources/task/${taskId}`);
        setResources(response.data); 
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    if (taskId) {
      fetchResources();
    }
  }, [taskId]);

  
  const deleteResource = async (resourceId) => {
    try {
      await axios.delete(`http://localhost:8080/api/resources/${taskId}/${resourceId}`);
      setResources(resources.filter(resource => resource._id !== resourceId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la ressource:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#003f6b]">Gestion des Ressources</h1>
        <Link
          to={`/resources/add/${taskId}`}
          className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={18} />
          Nouvelle Ressource
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource._id} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#dc4048]">
            <h2 className="text-xl font-semibold text-[#003f6b]">{resource.name}</h2>
            <p className="text-gray-700 mt-2">Type: {resource.type}</p>
            <p className="text-gray-700">Quantité: {resource.quantity}</p>
            <p className="text-gray-700">Fournisseur: {resource.supplier}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/resources/edit/${taskId}/${resource._id}`}
                className="bg-[#feb913] hover:bg-[#f6821f] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Edit size={16} />
              </Link>

              <button
                onClick={() => deleteResource(resource._id)}
                className="bg-[#dc4048] hover:bg-[#c63038] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesList;
