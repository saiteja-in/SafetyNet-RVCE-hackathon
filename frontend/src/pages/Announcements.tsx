import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaCheckCircle, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

type Report = {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  incidentLocation: string;
  incidentCity: string;
  address: string;
  severity: number;
  typeofdisaster: string;
  image: string;
  isVerified: string;
};

const Announcements = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3217/api/my/report');
        setReports(response.data);
      } catch (err) {
        setError('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  if (error) return <div className="text-red-500 text-center text-2xl mt-10">{error}</div>;

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'bg-green-500';
    if (severity <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold mb-10 text-center text-gray-800">Incident Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white shadow-xl rounded-lg overflow-hidden"
          >
            {report.image && (
              <div className="relative h-48">
                <img src={report.image} alt="Incident" className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 m-2 p-2 bg-white rounded-full shadow-md">
                  {report.isVerified === 'Yes' 
                    ? <FaCheckCircle className="text-green-500 text-xl" />
                    : <FaExclamationTriangle className="text-red-500 text-xl" />
                  }
                </div>
              </div>
            )}
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{report.typeofdisaster}</h2>
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-600">Severity:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className={`h-2.5 rounded-full ${getSeverityColor(report.severity)}`} 
                      style={{width: `${report.severity * 10}%`}}
                    ></div>
                  </div>
                  <p className="text-right text-xs mt-1 text-gray-600">{report.severity}/10</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-red-500" /> {report.incidentLocation}, {report.incidentCity}</p>
                <p className="flex items-center"><FaEnvelope className="mr-2 text-blue-500" /> {report.email}</p>
                <p className="flex items-center"><FaPhone className="mr-2 text-green-500" /> {report.mobileNumber}</p>
              </div>
              {report.isVerified === 'Yes' && (
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => navigate("/safe-loc")}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    Evacuate to Safe Region
                  </button>
                  <button
                    onClick={() => navigate("/emergency")}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                  >
                    Emergency Contacts
                  </button>
                </div>
              )}
              <p className={`mt-4 text-center ${report.isVerified === 'No' ? 'text-red-500' : 'text-green-500'} font-semibold`}>
                {report.isVerified === 'No' ? 'Not Verified by Authority' : 'Verified by Authority'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;