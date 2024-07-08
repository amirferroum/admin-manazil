import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import axios from "axios";
const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
    const [filterParam, setFilterParam] = useState("");
    const [searchText, setSearchText] = useState("");
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

    const showFiltersAndApply = (params) => {
        applyFilter(params);
        setFilterParam(params);
    };

    const removeAppliedFilter = () => {
        removeFilter();
        setFilterParam("");
        setSearchText("");
    };

    useEffect(() => {
        if (searchText === "") {
            removeAppliedFilter();
        } else {
            applySearch(searchText);
        }
    }, [searchText]);

    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            {filterParam && (
                <button onClick={removeAppliedFilter} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">
                    {filterParam}
                    <XMarkIcon className="w-4 ml-2" />
                </button>
            )}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline">
                    <FunnelIcon className="w-5 mr-2" />
                    Filter
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {locationFilters.map((l, k) => (
                        <li key={k}>
                            <a onClick={() => showFiltersAndApply(l)}>{l}</a>
                        </li>
                    ))}
                    <div className="divider mt-0 mb-0"></div>
                    <li>
                        <a onClick={removeAppliedFilter}>Remove Filter</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

function Transactions() {
    const [properties, setProperties] = useState([]);
    const [trans, setTrans] = useState(RECENT_TRANSACTIONS);

    useEffect(() => {
        fetchProperties();
        const intervalId = setInterval(fetchProperties, 15000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:5000/properties");
            setProperties(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };
    const deleteProperties = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/properties/${userId}`);
            fetchProperties();
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS);
    };

    const applyFilter = (params) => {
        const filteredTransactions = RECENT_TRANSACTIONS.filter((t) => t.location === params);
        setTrans(filteredTransactions);
    };

    const applySearch = (value) => {
        const filteredTransactions = RECENT_TRANSACTIONS.filter((t) => 
            t.email.toLowerCase().includes(value.toLowerCase()) ||
            t.email.toLowerCase().includes(value.toLowerCase())
        );
        setTrans(filteredTransactions);
    };

    return (
        <>
            <TitleCard
                title="Properties"
                topMargin="mt-2"
                TopSideButtons={
                    <TopSideButtons
                        applySearch={applySearch}
                        applyFilter={applyFilter}
                        removeFilter={removeFilter}
                    />
                }
            >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                            <th>Id</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>OwnerId</th>
                        <th>Country</th>
                        <th>City</th>
                        <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property, index) => (
                                <tr key={index}>
                                    <td>{property.id}</td>
                                    <td>{property.title}</td>
                                    <td>{property.createdAt}</td>
                                    <td>{property.ownerId}</td>
                                    <td>${property.info.country}</td>
                                    <td>{property.info.city || "none"}</td>
                                    <td>
                                        <button className="btn btn-square btn-ghost"  onClick={() => deleteProperties(property.id)}>
                                            <TrashIcon className="w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
}

export default Transactions;
