import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";

const Searchrequest = () => {
    
  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");

  const axiosintance = useAxios();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handlesubmit = (e) =>{
    e.preventDefault();


    const bloodgrp=e.target.bloodgrp.value;
    
    

    axiosintance.get(`/search_request?bloodgrp=${encodeURIComponent(bloodgrp)}&district=${district}&upazila=${upazila}`)
    .then(res =>{
        console.log(res.data);
    })



  }

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <fieldset className="flex fieldset bg-base-200 border-base-300 rounded-box  border p-4">
          <select
            name="bloodgrp"
            defaultValue="Select your blood group"
            className="select"
          >
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
            onChange={(e) => {
              setUpazila(e.target.value);
            }}
            defaultValue="Select your upazila"
            className="select"
          >
            <option value="" disabled selected>
              Select Upazila
            </option>
            {upazilas.map((upazila) => (
              <option>{upazila?.name}</option>
            ))}
          </select>
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
            }}
            defaultValue="Select your district"
            className="select"
          >
            <option value="" disabled selected>
              Select District
            </option>
            {districts.map((district) => (
              <option>{district?.name}</option>
            ))}
          </select>
          <button className="btn">Search</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Searchrequest;
