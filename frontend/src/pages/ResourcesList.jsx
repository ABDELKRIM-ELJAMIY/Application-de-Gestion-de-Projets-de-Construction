import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

const ResourcesList = () => {
  const resources = [
    {
      id: 1,
      name: 'Cement Bags',
      type: 'Material',
      quantity: 100,
      supplier: 'ABC Constructions',
    },
    {
      id: 2,
      name: 'Excavator',
      type: 'Equipment',
      quantity: 2,
      supplier: 'XYZ Rentals',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#003f6b]">Gestion des Ressources</h1>
        <Link
          to="/resources/add"
          className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={18} />
          Nouvelle Ressource
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#dc4048]">
            <h2 className="text-xl font-semibold text-[#003f6b]">{resource.name}</h2>
            <p className="text-gray-700 mt-2">Type: {resource.type}</p>
            <p className="text-gray-700">Quantité: {resource.quantity}</p>
            <p className="text-gray-700">Fournisseur: {resource.supplier}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/resources/edit`}
                className="bg-[#feb913] hover:bg-[#f6821f] text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Edit size={16} />
              </Link>
              <button
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