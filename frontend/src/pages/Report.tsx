import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IncidentReportForm, { IncidentFormData } from '../components/IncidentReportForm';
import toast, { Toaster } from 'react-hot-toast';

const IncidentReportPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    console.log(formData);
    
    setIsSubmitting(true);
    try {
      // Send the form data to your backend
      const response = await axios.post('http://localhost:3217/api/my/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Incident report submitted successfully!');
      navigate(`/announcements`);
    } catch (error) {
      console.error('Error submitting incident report:', error);
      toast.error('Failed to submit incident report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-5xl font-bold mb-6 text-center">Report an Incident</h1>
      <IncidentReportForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};

export default IncidentReportPage;
