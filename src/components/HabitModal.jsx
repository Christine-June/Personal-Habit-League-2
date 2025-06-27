// src/components/HabitModal.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HabitSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  frequency: Yup.string()
    .oneOf(["daily", "weekly", "monthly"], "Invalid frequency")
    .required("Frequency is required"),
  description: Yup.string(),
});

const HabitModal = ({ habit = null, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          {habit ? "Edit Habit" : "Create Habit"}
        </h2>
        <Formik
          initialValues={{
            name: habit?.name || "",
            description: habit?.description || "",
            frequency: habit?.frequency || "daily",
          }}
          validationSchema={HabitSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await onSubmit(habit ? { ...habit, ...values } : values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field
                  name="name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage name="description" component="div" className="text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium">Frequency</label>
                <Field
                  as="select"
                  name="frequency"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Field>
                <ErrorMessage name="frequency" component="div" className="text-red-500" />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {habit ? "Update" : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HabitModal;
