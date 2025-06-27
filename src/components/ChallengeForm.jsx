import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ChallengeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  start_date: Yup.date().required('Start date is required'),
  end_date: Yup.date()
    .required('End date is required')
    .min(Yup.ref('start_date'), 'End date must be after start date'),
});

export default function ChallengeForm({ onClose, onSave, initialData, currentUser }) {
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  return (
    <Formik
      initialValues={{
        name: initialData?.name || '',
        description: initialData?.description || '',
        start_date: initialData?.start_date || '',
        end_date: initialData?.end_date || '',
      }}
      validationSchema={ChallengeSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await onSave({ ...values, created_by: currentUser.id });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            {initialData ? 'Edit Challenge' : 'New Challenge'}
          </h2>
          <label>
            Name
            <Field name="name" className="w-full border rounded p-2 mt-1" />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </label>
          <label>
            Description
            <Field
              name="description"
              as="textarea"
              className="w-full border rounded p-2 mt-1"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />
          </label>
          <label>
            Start Date
            <Field
              name="start_date"
              type="date"
              className="w-full border rounded p-2 mt-1"
            />
            <ErrorMessage
              name="start_date"
              component="div"
              className="text-red-500"
            />
          </label>
          <label>
            End Date
            <Field
              name="end_date"
              type="date"
              className="w-full border rounded p-2 mt-1"
            />
            <ErrorMessage
              name="end_date"
              component="div"
              className="text-red-500"
            />
          </label>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

// Usage example (wherever ChallengeForm is used):
// <ChallengeForm onClose={...} onSave={...} currentUserName={user.name} />