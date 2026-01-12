import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";

const Searchrequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [searchrequest, setSearchrequest] = useState([]);

  const axiosintance = useAxios();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const bloodgrp = e.target.bloodgrp.value;

    axiosintance
      .get(
        `/search_request?bloodgrp=${encodeURIComponent(
          bloodgrp
        )}&district=${district}&upazila=${upazila}`
      )
      .then((res) => {
        console.log(res.data);
        setSearchrequest(res.data);
      });
  };

  return (
    <div className="p-4">
      {/* Search Form */}
      <form onSubmit={handlesubmit}>
        <fieldset className="flex flex-col md:flex-row gap-3 bg-base-200 border border-gray-300 rounded-box p-4">
          <select name="bloodgrp" className="select w-full md:w-auto">
            <option value="" disabled selected>
              Select blood group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A−</option>
            <option value="B+">B+</option>
            <option value="B-">B−</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB−</option>
            <option value="O+">O+</option>
            <option value="O-">O−</option>
          </select>

          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select w-full md:w-auto"
          >
            <option value="" disabled selected>
              Select Upazila
            </option>
            {upazilas.map((u) => (
              <option key={u.name}>{u.name}</option>
            ))}
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select w-full md:w-auto"
          >
            <option value="" disabled selected>
              Select District
            </option>
            {districts.map((d) => (
              <option key={d.name}>{d.name}</option>
            ))}
          </select>

          <button className="btn w-full md:w-auto">Search</button>
        </fieldset>
      </form>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {searchrequest.map((request) => (
          <div
            key={request.requesterEmail + request.createdAt}
            className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-black">
                {request.recipientName}
              </h3>
              <span
                className={`px-2 py-1 text-sm font-medium rounded-full border ${
                  request.donor_status === "approved"
                    ? "text-black border-black"
                    : "text-black border-gray-500"
                }`}
              >
                {request.donor_status}
              </span>
            </div>

            {/* Info */}
            <div className="text-sm text-black space-y-1">
              <p>
                <span className="font-medium">Requester:</span>{" "}
                {request.requesterName} ({request.requesterEmail})
              </p>
              <p>
                <span className="font-medium">Blood Group:</span>{" "}
                {request.bloodGroup}
              </p>
              <p>
                <span className="font-medium">Donation Date:</span>{" "}
                {new Date(request.donationDateTime).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Hospital:</span>{" "}
                {request.hospitalName}
              </p>
              <p>
                <span className="font-medium">Address:</span> {request.address},{" "}
                {request.upazila}, {request.district}
              </p>
              {request.message && (
                <p>
                  <span className="font-medium">Message:</span> {request.message}
                </p>
              )}
              <p className="text-gray-500 text-xs">
                Requested on: {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchrequest;
