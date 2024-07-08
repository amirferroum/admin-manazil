import React, { useState } from "react";
import axios from "axios";


function AddLeadModalBody({closeModal,propertyId,onDeviceAdded}){
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [macAdress, setMacAdress] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      try {
        const response = await axios.post(
          `http://localhost:5000/properties/${propertyId}/devices`,
          {
            deviceName,
            deviceType,
            macAdress,
            status,
          }
        );
  
        if (response.status === 201) {
          onDeviceAdded();
          setDeviceName("");
          setDeviceType("");
          setMacAdress("");
          setStatus("");
        }
      } catch (error) {
        console.error("Error adding IoT device:", error);
        setError("Failed to add IoT device. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    return(
        <>
   <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block mb-2">Device Name:</label>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Device Type:</label>
        <input
          type="text"
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Mac Address:</label>
        <input
          type="text"
          value={macAdress}
          onChange={(e) => setMacAdress(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
  
      <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button         type="submit"
  className="btn btn-primary px-6" >ADD</button>
            </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {console.log(propertyId)}

    </form>
        
        </>
    )
}

export default AddLeadModalBody