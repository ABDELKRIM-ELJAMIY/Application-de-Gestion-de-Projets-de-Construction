import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, Banknote, Edit, Eye, Trash2, Plus } from 'lucide-react';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
        setError("Erreur lors du chargement des projets.");
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="container mx-auto p-6 font-poppins">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#003f6b]">Gestion de Projets</h1>
        <Link
          to="/projects/add"
          className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={18} />
          Nouveau Projet
        </Link>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-gray-500 text-center col-span-3 py-6 text-lg">
            Chargement des projets...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center col-span-3 py-6 text-lg">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-gray-500 text-center col-span-3 py-6 text-lg">
            Aucun projet trouvé. 
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#dc4048]">
              <h2 className="text-xl font-semibold text-[#003f6b]">{project.nom}</h2>
              <p className="text-gray-700 mt-2">{project.description}</p>

              <div className="my-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2 text-[#7acdf1]" />
                  <span>Début : {new Date(project.dateDebut).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2 text-[#7acdf1]" />
                  <span>Fin : {new Date(project.dateFin).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Banknote size={16} className="mr-2 text-[#feb913]" />
                  <span>Budget : {project.budget.toLocaleString()} Dh</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/project/${project._id}/tasks`}
                  className="bg-[#7acdf1] hover:bg-[#5ba6d8] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
                >
                  <Eye size={16} />
                  Voir les Tâches
                </Link>

                <Link
                  to={`/projects/edit/${project._id}`}
                  className="bg-[#feb913] hover:bg-[#f6821f] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
                >
                  <Edit size={16} />
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-[#dc4048] hover:bg-[#c63038] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
                >
                  <Trash2 size={16} />
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
