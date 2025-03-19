import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom de la tâche est requis'),
  description: Yup.string().required('La description est requise'),
  startDate: Yup.date().required('La date de début est requise'),
  endDate: Yup.date()
    .required('La date de fin est requise')
    .min(Yup.ref('startDate'), 'La date de fin ne peut pas être avant la date de début'),
  resources: Yup.string().required('Les ressources sont requises'),
});

const AddTask = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    navigate('/tasks');
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
          resources: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-[#003f6b]">Nom de la Tâche</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:outline-none focus:ring-2 focus:ring-[#dc4048]"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold text-[#003f6b]">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:outline-none focus:ring-2 focus:ring-[#dc4048]"
                rows="4"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-[#003f6b]">Date de Début</label>
                <Field
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:outline-none focus:ring-2 focus:ring-[#dc4048]"
                />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-[#003f6b]">Date de Fin</label>
                <Field
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:outline-none focus:ring-2 focus:ring-[#dc4048]"
                />
                <ErrorMessage name="endDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="resources" className="block text-sm font-semibold text-[#003f6b]">Ressources</label>
              <Field
                type="text"
                id="resources"
                name="resources"
                className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:outline-none focus:ring-2 focus:ring-[#dc4048]"
              />
              <ErrorMessage name="resources" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg transition-colors duration-200 mt-6 w-full"
            >
              Enregistrer la Tâche
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;
