import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const Myrequest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [myrequest, setMyrequest] = useState([]);
  const [totalrequest, setTotalrequest] = useState(0);
  const [itemperpage, setItemperpage] = useState(10);
  const [currentpage, setCurrentpage] = useState(1);

  useEffect(() => {
    axiosSecure
      .get(`/myrequest?page=${currentpage - 1}&size=${itemperpage}`)
      .then((res) => {
        setMyrequest(res.data.request);
        setTotalrequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentpage, itemperpage]);

  const numberOfPages = Math.ceil(totalrequest / itemperpage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const onlcickpre = () => {
    if (currentpage > 1) setCurrentpage(currentpage - 1);
  };
  const onlcicknext = () => {
    if (currentpage < pages.length) setCurrentpage(currentpage + 1);
  };

  const handleStatusChange = (id, status) => {
    axiosSecure
      .patch(`/myrequest/${id}/status`, { status })
      .then(() => {
        setMyrequest((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, donor_status: status } : req
          )
        );
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      axiosSecure.delete(`/myrequest/${id}`).then(() => {
        setMyrequest((prev) => prev.filter((req) => req._id !== id));
      });
    }
  };

  const formatDate = (datetime) => new Date(datetime).toLocaleDateString();
  const formatTime = (datetime) => new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-gray-200 bg-white">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Recipient Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myrequest.map((req, index) => (
              <tr key={req._id}>
                <th>{(currentpage - 1) * itemperpage + index + 1}</th>
                <td>{req.recipientName}</td>
                <td>
                  {req.district}, {req.upazila}
                </td>
                <td>{formatDate(req.donationDateTime)}</td>
                <td>{formatTime(req.donationDateTime)}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.donor_status}</td>
                <td>
                  {req.donor_status === "inprogress" && (
                    <>
                      {req.requesterName} <br />
                      {req.requesterEmail}
                    </>
                  )}
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => navigate(`/dashboard/myrequest/${req._id}`)}
                    className="btn btn-sm bg-gray-200 hover:bg-gray-300"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/dashboard/myrequest/edit/${req._id}`)
                    }
                    className="btn btn-sm bg-gray-200 hover:bg-gray-300"
                  >
                    Edit
                  </button>

                  {req.donor_status === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req._id, "done")}
                        className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                      >
                        Done
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(req._id, "canceled")
                        }
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm bg-red-200 hover:bg-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className="btn bg-gray-200 hover:bg-gray-300"
          onClick={onlcickpre}
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${
              currentpage === page ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentpage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="btn bg-gray-200 hover:bg-gray-300"
          onClick={onlcicknext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Myrequest;
