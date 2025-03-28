import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import axios from 'axios';

const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tasks/project/${projectId}`);
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération des tâches.');
        setLoading(false);
      }
    };

    if (projectId) fetchTasks();
  }, [projectId]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setError('Erreur lors de la suppression de la tâche.');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700">Chargement des tâches...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#003f6b]">Gestion des Tâches</h1>
        <Link
          to={`/tasks/add/${projectId}`}
          className="bg-[#7acdf1] hover:bg-[#5ba6d8] text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
        >
          <Plus size={16} />
          Ajouter une Tâche
        </Link>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="text-gray-500 text-center col-span-3 py-6 text-lg">
             Aucune tâche trouvée
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#dc4048]">
              <h2 className="text-xl font-semibold text-[#003f6b]">{task.description}</h2>
              <p className="text-gray-700 mt-2">Début: {new Date(task.dateDebut).toLocaleDateString()}</p>
              <p className="text-gray-700 mt-2">Fin: {new Date(task.dateFin).toLocaleDateString()}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/tasks/edit/${task._id}`} className="bg-[#feb913] hover:bg-[#f6821f] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm">
                  <Edit size={16} /> Modifier
                </Link>

                <button onClick={() => handleDelete(task._id)} className="bg-[#dc4048] hover:bg-[#c63038] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm">
                  <Trash2 size={16} /> Supprimer
                </button>

                <Link
                  to={`/resources/task/${task._id}`}
                  className="bg-[#1c740b] hover:bg-[#1d940c] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
                >
                  <Eye size={16} /> Voir les Ressources
                </Link>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
