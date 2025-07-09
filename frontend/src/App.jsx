import { useState } from "react";
import { companyProfile } from "./api/api";
import EditableField from "./components/EditableField";
import LoadingIcon from "./components/LoadingIcon";

export default function App() {
  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
        setError("The URL field cannot be empty.");
        return;
    }
    setIsLoading(true);
    setError("");
    setProfile(null); // Clear the previous profile
    try {
      const data = await companyProfile(url);
      setProfile(data);
      setEditedProfile(data); // Initialize the editable profile
    } catch (err) {
      setError(err.message);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({...prev, [name]: value}));
  };

  const handleSaveChanges = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedProfile(profile); // Revert to the original profile
    setIsEditing(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Company Profile Generator</h1>
          <p className="text-md text-gray-600 mt-2">Enter the URL of a company's website to generate and edit its profile.</p>
        </header>

        {/* URL input form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hidden sm:block"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(""); }}
              placeholder="E.g., https://www.accenture.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingIcon /> : "Generate Profile"}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Display of the Company Profile */}
        {profile && (
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-500 animate-fade-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                {isEditing ? (
                   <input 
                      name="company_name"
                      value={editedProfile.company_name} 
                      onChange={handleProfileChange}
                      className="text-3xl font-bold text-gray-900 border-b-2 border-blue-200 focus:border-blue-500 outline-none"
                   />
                ) : (
                  <h2 className="text-3xl font-bold text-gray-900">{profile.company_name}</h2>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button onClick={handleSaveChanges} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Save</button>
                    <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Edit</button>
                )}
              </div>
            </div>
            
            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <EditableField label="Service Line" name="service_line" value={editedProfile.service_line} onChange={handleProfileChange} isEditing={isEditing} />
              </div>
              <div className="md:col-span-2">
                 <EditableField label="Company Description" name="company_description" value={editedProfile.company_description} onChange={handleProfileChange} isEditing={isEditing} isTextArea={true}/>
              </div>
              
              <EditableField label="Keywords (Tier 1)" name="tier1_keywords" value={editedProfile.tier1_keywords} onChange={handleProfileChange} isEditing={isEditing} isTextArea={true}/>
              <EditableField label="Keywords (Tier 2)" name="tier2_keywords" value={editedProfile.tier2_keywords} onChange={handleProfileChange} isEditing={isEditing} isTextArea={true}/>

              <EditableField label="Emails" name="emails" value={editedProfile.emails} onChange={handleProfileChange} isEditing={isEditing} />
              <EditableField label="Point of Contact (POC)" name="poc" value={editedProfile.poc} onChange={handleProfileChange} isEditing={isEditing} />
            </div>
          </div>
        )}
      </div>
       <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}