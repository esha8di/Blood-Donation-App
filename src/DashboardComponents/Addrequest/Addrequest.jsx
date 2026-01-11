import React, { useContext, useEffect, useState } from "react";
import { Contextapi } from "../../Authprovider/Authprovider";
import axios from "axios";
// import useAxios from "../../Hooks/useAxios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link} from "react-router";
import toast from "react-hot-toast";

const Addrequest = () => {
  const { user } = useContext(Contextapi);
  // const navigate = useNavigate();

  const axiosSecure=useAxiosSecure();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const requesterName = e.target.requesterName.value;
    const requesterEmail = e.target.requesterEmail.value;
    const recipientName = e.target.recipientName.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;
    const hospitalName = e.target.hospitalName.value;
    const address = e.target.address.value;
    const bloodGroup = e.target.bloodGroup.value;
    const donationDate = e.target.donationDate.value;
    const donationTime = e.target.donationTime.value;
    const message = e.target.message.value;

    const donationRequest = {
      requesterName,
      requesterEmail,
      recipientName,
      district,
      upazila,
      hospitalName,
      address,
      bloodGroup,
      donationDateTime: new Date(`${donationDate}T${donationTime}`).toISOString(),
      message,
      donor_status:'pending'
      
    };

    console.log("Donation Request:", donationRequest);

    axiosSecure.post('/requests', donationRequest)
    .then(res=>{
      console.log('donation',res);
      // alert(res.data.insertedId);
      // navigate('/dashboard/myrequest');
      toast.success('Request has been added')

    })

    

   
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Create Donation Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="requesterName"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
              placeholder="Requester Name"
            />

            <input
              type="email"
              name="requesterEmail"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
              placeholder="Requester Email"
            />
          </div>

         
          <input
            type="text"
            name="recipientName"
            required
            placeholder="Recipient Name"
            className="input input-bordered w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="upazila"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select Upazila
              </option>
              {upazilas.map((u) => (
                <option  value={u?.name}>
                  {u?.name}
                </option>
              ))}
            </select>

            <select
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select District
              </option>
              {districts.map((d) => (
                <option  value={d?.name}>
                  {d?.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            name="hospitalName"
            required
            placeholder="Hospital Name"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="address"
            required
            placeholder="Full Address"
            className="input input-bordered w-full"
          />

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="bloodGroup"
              required
              className="select select-bordered w-full"
            >
              <option value="">Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <input
              type="date"
              name="donationDate"
              required
              className="input input-bordered w-full"
            />

            <input
              type="time"
              name="donationTime"
              required
              className="input input-bordered w-full"
            />
          </div>

        
          <textarea
            name="message"
            required
            placeholder="Why do you need blood?"
            className="textarea textarea-bordered w-full min-h-[120px]"
          ></textarea>

         
          <button type="submit" className="btn bg-black btn-primary w-full mt-4">
          
           Request Blood
          
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addrequest;
