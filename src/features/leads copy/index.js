import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getLeadsContent } from "./leadSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import moment from "moment";

const TopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add IoT device", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }));
    };

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddNewLeadModal}>
                Add
            </button>
        </div>
    );
};

const Leads = () => {
    const [demand, setDemand] = useState([]);
    const { leads } = useSelector(state => state.lead);
    const dispatch = useDispatch();
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [macAddress, setMacAddress] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const onDeviceAdded = () => {
        // Implement any actions needed after adding a device
        console.log("Device added successfully!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                `http://localhost:5000/properties/${selectedPropertyId}/devices`,
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
                setIsModalOpen(false);
                window.location.reload(); // Refresh the page
            }
        } catch (error) {
            console.error("Error adding IoT device:", error);
            setError("Failed to add IoT device. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(getLeadsContent());
        fetchDemands();

        const intervalId = setInterval(fetchDemands, 15000);
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const fetchDemands = async () => {
        try {
            const response = await axios.get("http://localhost:5000/alldemand");
            setDemand(response.data);
        } catch (error) {
            console.error("Error fetching demands:", error);
        }
    };

    const openModalWithPropertyId = (propertyId) => {
        setSelectedPropertyId(propertyId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPropertyId(null);
    };

    const deleteCurrentLead = (index) => {
        dispatch(openModal({
            title: "Confirmation",
            bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this lead?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        }));
    };

    return (
        <>
            <TitleCard title="Current Demands" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Created At</th>
                                <th>Owner ID</th>
                                <th>Property ID</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {demand.map((l, k) => (
                                <tr key={k}>
                                    <td>{l.id}</td>
                                    <td>{moment(l.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                                    <td>{l.ownerId}</td>
                                    <td>{l.propertyId}</td>
                                    <td>{l.status}</td>
                                    <td>
                                        <button className="btn" onClick={() => openModalWithPropertyId(l.propertyId)}>open modal</button>
                                        {isModalOpen && selectedPropertyId === l.propertyId && (
                                            <>
                                                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50"></div>
                                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                                    <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
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

                                                            <div className="flex justify-end">
                                                                <button type="button" className="btn btn-ghost mr-2" onClick={closeModal}>Cancel</button>
                                                                <button type="submit" className="btn btn-primary">
                                                                    {loading ? "Adding..." : "Add"}
                                                                </button>
                                                            </div>
                                                            {error && <p className="text-red-500 mt-2">{error}</p>}
                                                        </form>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
};

export default Leads;
