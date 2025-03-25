import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom de la ressource est requis'),
  type: Yup.string().required('Le type de la ressource est requis'),
  quantity: Yup.number().required('La quantité est requise').positive('La quantité doit être un nombre positif'),
  supplier: Yup.string().required('Les informations du fournisseur sont requises'),
});

const AddResource = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (values) => {
    try {
      await axios.post(`http://localhost:8080/api/resources/${id}`, values);
      navigate(`/resources/task/${id}`);
    } catch (error) {
      console.error('Erreur lors de l’ajout de la ressource :', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#003f6b] mb-6">Ajouter une Ressource</h1>
      <Formik
        initialValues={{ name: '', type: '', quantity: 0, supplier: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-[#003f6b]">Nom</label>
              <Field type="text" id="name" name="name" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048]" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-semibold text-[#003f6b]">Type</label>
              <Field type="text" id="type" name="type" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048]" />
              <ErrorMessage name="type" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-semibold text-[#003f6b]">Quantité</label>
              <Field type="number" id="quantity" name="quantity" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048]" />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="supplier" className="block text-sm font-semibold text-[#003f6b]">Fournisseur</label>
              <Field type="text" id="supplier" name="supplier" className="w-full p-3 mt-2 border rounded-lg border-[#dc4048]" />
              <ErrorMessage name="supplier" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button type="submit" className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg w-full">
              Enregistrer la Ressource
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddResource;
