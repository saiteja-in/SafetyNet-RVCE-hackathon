import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust this import path as needed
import { User, Mail, Phone, Shield, AlertTriangle, Info } from 'lucide-react';

const Emergency = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {currentUser && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 flex items-center">
            <User className="mr-2" /> Your Emergency Contact Information
          </h2>
          <div className="flex items-center mb-4">
            {currentUser.profilePicture && (
              <img 
                src={currentUser.profilePicture} 
                alt="Profile" 
                className="w-20 h-20 rounded-full mr-6 border-2 border-blue-500"
              />
            )}
            <div>
              <p className="text-lg mb-2 flex items-center">
                <User className="mr-2 text-blue-600" />
                <span className="font-semibold mr-2">Name:</span> {currentUser.username}
              </p>
              <p className="text-lg mb-2 flex items-center">
                <Mail className="mr-2 text-blue-600" />
                <span className="font-semibold mr-2">Email:</span> {currentUser.email}
              </p>
              <p className="text-lg flex items-center">
                <Phone className="mr-2 text-blue-600" />
                <span className="font-semibold mr-2">Phone:</span> 8179648046
              </p>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Emergency Preparedness</h1>
      
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-r-lg flex items-center">
        <AlertTriangle className="mr-4 flex-shrink-0" />
        <p className="font-bold">Disasters can strike at any moment. Be prepared with these steps:</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center">
            <Shield className="mr-2" /> Preparation Steps
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create a disaster plan and ensure your family knows it.</li>
            <li>Build an emergency kit with water, food, first-aid items, and a flashlight.</li>
            <li>Stay informed about potential disasters in your area and safety steps.</li>
            <li>Practice evacuation drills with your family.</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center">
            <Phone className="mr-2" /> Emergency Contacts
          </h2>
          <ul className="space-y-2">
            <li><strong>Emergency Services:</strong> 911</li>
            <li><strong>Local Police Department:</strong> 94906 17124</li>
            <li><strong>Fire Department:</strong>  040 2344 9212</li>
            <li><strong>Poison Control:</strong> 1-800-222-1222</li>
            <li><strong>FEMA Disaster Assistance:</strong> 1-800-621-3362</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center">
          <Info className="mr-2" /> Useful Resources
        </h2>
        <ul className="space-y-2">
          <li><a href="https://www.ready.gov/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Ready.gov - Disaster Preparedness</a></li>
          <li><a href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">American Red Cross - Emergency Preparedness</a></li>
          <li><a href="https://www.fema.gov/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Federal Emergency Management Agency (FEMA)</a></li>
          <li><a href="https://www.weather.gov/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">National Weather Service</a></li>
        </ul>
      </div>

      <p className="text-sm text-gray-600 mt-8 text-center">For more information, please visit the official websites linked above.</p>
    </div>
  );
};

export default Emergency;