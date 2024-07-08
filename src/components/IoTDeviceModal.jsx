import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const IoTDeviceModal = ({ propertyId, onDeviceAdded, isOpen, onClose }) => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [macAddress, setMacAddress] = useState("");
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
          macAddress,
          status,
        }
      );

      if (response.status === 201) {
        onDeviceAdded();
        setDeviceName("");
        setDeviceType("");
        setMacAddress("");
        setStatus("");
        onClose(); // Close modal after successful submission
      }
    } catch (error) {
      console.error("Error adding IoT device:", error);
      setError("Failed to add IoT device. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} center>
      <div className="modal-content">
        <h2 className="text-lg font-bold mb-4">Add New IoT Device</h2>
        <form onSubmit={handleSubmit}>
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
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
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
          <button
            type="submit"
            disabled={loading}
            className={`inline-block px-6 py-3 text-white bg-primary rounded-md shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Adding..." : "Add IoT Device"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </Modal>
  );
};

export default IoTDeviceModal;
