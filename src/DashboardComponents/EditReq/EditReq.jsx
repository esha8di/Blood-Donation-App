import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const EditReq = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [requestData, setRequestData] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    requesterName: '',
    requesterEmail: '',
    recipientName: '',
    district: '',
    upazila: '',
    hospitalName: '',
    address: '',
    bloodGroup: '',
    donationDateTime: '',
    donationTime: '',
    message: '',
    donor_status: ''
  });

  // Fetch districts and upazilas JSON
  useEffect(() => {
    axios.get('/district.json').then(res => {setDistricts(res.data.districts);
       
    });
    axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
  }, []);

  // Fetch the request data by ID
  useEffect(() => {
    if (!id) return;

    axiosSecure.get(`/myrequest/view/${id}`)
      .then(res => {
        setRequestData(res.data);
        setFormData({
          requesterName: res.data.requesterName || '',
          requesterEmail: res.data.requesterEmail || '',
          recipientName: res.data.recipientName || '',
          district: res.data.district || '',
          upazila: res.data.upazila || '',
          hospitalName: res.data.hospitalName || '',
          address: res.data.address || '',
          bloodGroup: res.data.bloodGroup || '',
          donationDateTime: res.data.donationDateTime ? res.data.donationDateTime.split('T')[0] : '',
          donationTime: res.data.donationDateTime ? res.data.donationDateTime.split('T')[1]?.slice(0,5) : '',
          message: res.data.message || '',
          donor_status: res.data.donor_status || 'pending'
        });
      });
  }, [axiosSecure, id]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle update request
  const handleUpdate = (e) => {
    e.preventDefault();

    // Combine date and time for donationDateTime
    const donationDateTime = new Date(`${formData.donationDateTime}T${formData.donationTime}`).toISOString();

    const updatedRequest = {
      recipientName: formData.recipientName,
      district: formData.district,
      upazila: formData.upazila,
      hospitalName: formData.hospitalName,
      address: formData.address,
      bloodGroup: formData.bloodGroup,
      donationDateTime,
      message: formData.message,
      donor_status: formData.donor_status
    };

    axiosSecure.put(`/requests/edit/${id}`, updatedRequest)
      .then(res => {
        console.log('Update response:', res.data);
        toast.success('Request updated successfully!');
      })
      .catch(err => {
        console.error('Update error:', err);
        toast.error('Failed to update request');
      });
  };

  if (!requestData) return <p className="text-center mt-10">Loading request data...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Edit Donation Request
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="requesterName"
              value={formData.requesterName}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
            <input
              type="email"
              name="requesterEmail"
              value={formData.requesterEmail}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>

            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Upazila</option>
              {upazilas.map(u => (
                <option key={u.name} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>

            <input
              type="date"
              name="donationDate"
              value={formData.donationDateTime}
              onChange={(e) => setFormData(prev => ({ ...prev, donationDateTime: e.target.value }))}
              className="input input-bordered w-full"
            />
            <input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={(e) => setFormData(prev => ({ ...prev, donationTime: e.target.value }))}
              className="input input-bordered w-full"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full min-h-[120px]"
          ></textarea>

          <button
            type="submit"
            className="btn bg-black btn-primary w-full mt-4"
          >
            Update Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditReq;
