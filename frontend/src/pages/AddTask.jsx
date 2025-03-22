import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom de la tâche est requis'),
  description: Yup.string().required('La description est requise'),
  startDate: Yup.date().required('La date de début est requise'),
  endDate: Yup.date()
    .required('La date de fin est requise')
    .min(Yup.ref('startDate'), 'La date de fin ne peut pas être avant la date de début'),
});

const AddTask = () => {
  const navigate = useNavigate();
  const { projectId } = useParams(); 
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('Submitting Task:', {
      name: values.name,
      description: values.description,
      dateDebut: values.startDate,
      dateFin: values.endDate,
      projectId,
    }); 
    console.log('Project ID:', projectId);

    try {
      const response = await axios.post(`http://localhost:8080/api/tasks/project/${projectId}`, {
        name: values.name,
        description: values.description,
        dateDebut: values.startDate,
        dateFin: values.endDate,
      });

      console.log('Task Created:', response.data);
      navigate(`/project/${projectId}/tasks`); 
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
      setErrors({ api: 'Une erreur est survenue lors de la création de la tâche.' });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#003f6b] mb-6">Ajouter une Tâche</h1>

      <Formik
        initialValues={{
          name: '',
          description: '',
          startDate: '',
          endDate: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg">
            {errors.api && <div className="text-red-500 text-xs mb-4">{errors.api}</div>}

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-[#003f6b]">Nom de la Tâche</label>
              <Field type="text" id="name" name="name" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048]" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold text-[#003f6b]">Description</label>
              <Field as="textarea" id="description" name="description" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048]" rows="4" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-[#003f6b]">Date de Début</label>
                <Field type="date" id="startDate" name="startDate" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048]" />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-[#003f6b]">Date de Fin</label>
                <Field type="date" id="endDate" name="endDate" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048]" />
                <ErrorMessage name="endDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <button type="submit" className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer la Tâche'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;
