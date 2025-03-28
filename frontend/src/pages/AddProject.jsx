import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const AddProject = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const formattedValues = {
      nom: values.name, 
      description: values.description,
      dateDebut: values.startDate,  
      dateFin: values.endDate,  
      budget: Number(values.budget)
    };

    try {
      const response = await axios.post('http://localhost:8080/api/projects', formattedValues, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Response:", response.data);
      navigate('/'); 
    } catch (err) {
      console.error('Failed to create project', err.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#003f6b] mb-6">Add New Project</h1>

      <Formik
        initialValues={{
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          budget: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-[#003f6b]">Project Name</label>
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
                <label htmlFor="startDate" className="block text-sm font-semibold text-[#003f6b]">Start Date</label>
                <Field
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:outline-none focus:ring-2 focus:ring-[#dc4048]"
                />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-[#003f6b]">End Date</label>
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
              <label htmlFor="budget" className="block text-sm font-semibold text-[#003f6b]">Budget</label>
              <Field
                type="number"
                id="budget"
                min="0"
                name="budget"
                className="w-full p-3 mt-2 border rounded-lg border-[#dc4048] focus:outline-none focus:ring-2 focus:ring-[#dc4048]"
              />
              <ErrorMessage name="budget" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${isSubmitting ? 'bg-gray-400' : 'bg-[#dc4048] hover:bg-[#f6821f]'
                } text-white py-2 px-4 rounded-lg transition-colors duration-200 mt-6 w-full`}
            >
              {isSubmitting ? 'Saving...' : 'Save Project'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProject;
