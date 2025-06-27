import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HabitSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  frequency: Yup.string().oneOf(["daily", "weekly", "monthly"]).required("Frequency is required"),
  user_id: Yup.number().required("User is required"),
});

export default function HabitForm({ onClose, onSave, initialData = {}, users }) {
  return (
    <Formik
      initialValues={{
        name: initialData.name || "",
        description: initialData.description || "",
        frequency: initialData.frequency || "daily",
        user_id: initialData.user_id || (users?.[0]?.id ?? ""),
      }}
      validationSchema={HabitSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await onSave(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            {initialData.id ? "Edit Habit" : "New Habit"}
          </h2>
          <label>
            Name
            <Field name="name" className="w-full border rounded p-2 mt-1" />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </label>
          <label>
            Description
            <Field name="description" as="textarea" className="w-full border rounded p-2 mt-1" />
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </label>
          <label>
            Frequency
            <Field as="select" name="frequency" className="w-full border rounded p-2 mt-1">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Field>
            <ErrorMessage name="frequency" component="div" className="text-red-500" />
          </label>
          <label>
            User
            <Field as="select" name="user_id" className="w-full border rounded p-2 mt-1">
              <option value="">Select user</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username || `User ${user.id}`}
                </option>
              ))}
            </Field>
            <ErrorMessage name="user_id" component="div" className="text-red-500" />
          </label>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}