import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Project name is required'),
  description: Yup.string().required('Description is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date cannot be before start date'),
  budget: Yup.number().required('Budget is required').positive('Budget must be a positive number'),
});

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
  });

  // Charger les données du projet
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${id}`);
        const project = response.data;
        setInitialValues({
          name: project.nom,
          description: project.description,
          startDate: project.dateDebut.split('T')[0], 
          endDate: project.dateFin.split('T')[0],
          budget: project.budget,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:8080/api/projects/${id}`, {
        nom: values.name,
        description: values.description,
        dateDebut: values.startDate,
        dateFin: values.endDate,
        budget: values.budget,
      });

      navigate('/'); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#003f6b] mb-6">Modifier le Projet</h1>

      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-[#003f6b]">Nom du Projet</label>
              <Field type="text" id="name" name="name" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:ring-2 focus:ring-[#dc4048]" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold text-[#003f6b]">Description</label>
              <Field as="textarea" id="description" name="description" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:ring-2 focus:ring-[#dc4048]" rows="4" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-[#003f6b]">Date de Début</label>
                <Field type="date" id="startDate" name="startDate" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:ring-2 focus:ring-[#dc4048]" />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-[#003f6b]">Date de Fin</label>
                <Field type="date" id="endDate" name="endDate" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:ring-2 focus:ring-[#dc4048]" />
                <ErrorMessage name="endDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="budget" className="block text-sm font-semibold text-[#003f6b]">Budget</label>
              <Field type="number" id="budget" name="budget" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:ring-2 focus:ring-[#dc4048]" />
              <ErrorMessage name="budget" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button type="submit" className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg transition-colors duration-200 mt-6 w-full">
              Sauvegarder les Modifications
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProject;
