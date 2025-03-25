import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom de la ressource est requis'),
  type: Yup.string().required('Le type de la ressource est requis'),
  quantity: Yup.number()
    .required('La quantité est requise')
    .positive('La quantité doit être un nombre positif'),
  supplier: Yup.string().required('Les informations du fournisseur sont requises'),
});

const EditResource = () => {
  const navigate = useNavigate();
  const { taskId, resourceId } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: '',
    type: '',
    quantity: '',
    supplier: '',
  });

  useEffect(() => {
    if (!taskId || !resourceId) {
      console.error("Missing taskId or resourceId");
      return;
    }

    axios.get(`http://localhost:8080/api/resources/task/${taskId}`)
      .then(response => {
        const resource = response.data.find(res => res._id === resourceId);
        if (resource) {
          setInitialValues({
            name: resource.name,
            type: resource.type,
            quantity: resource.quantity,
            supplier: resource.supplier,
          });
        }
      })
      .catch(error => console.error('Erreur lors de la récupération de la ressource :', error));
  }, [taskId, resourceId]);




  const handleSubmit = (values) => {
    axios
      .put(`http://localhost:8080/api/resources/${taskId}/${resourceId}`, values)
      .then(() => {
        console.log('✅ Ressource mise à jour avec succès:', values);
        navigate(`/resources/task/${taskId}`); 
      })
      .catch((error) => console.error('Erreur lors de la mise à jour de la ressource :', error));
  };


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#003f6b] mb-6">Modifier la Ressource</h1>
      <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
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

            <button type="submit" disabled={isSubmitting} className="bg-[#dc4048] hover:bg-[#f6821f] text-white py-2 px-4 rounded-lg w-full">
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditResource;
