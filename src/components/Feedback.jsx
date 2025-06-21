import { useState } from 'react';

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send feedback to your backend or an API endpoint
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <section className="max-w-xl mx-auto my-8 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">We value your feedback!</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">Let us know what you think about Habit League.</p>
      {submitted ? (
        <div className="text-green-600 dark:text-green-400 font-semibold">Thank you for your feedback!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 mb-3"
            rows={4}
            placeholder="Your feedback..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </section>
  );
}