import React from 'react';
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const AllRequests = () => {
    const axiosSecure = useAxiosSecure();

  const [myrequest, setMyrequest] = useState([]);
  const [totalrequest, setTotalrequest] = useState(0);
  const [itemperpage, setItemperpage] = useState(10);
  const [currentpage, setCurrentpage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    axiosSecure
      .get(`/allrequest?page=${currentpage - 1}&size=${itemperpage}`)
      .then((res) => {
        setMyrequest(res.data.request);
        setTotalrequest(res.data.totalRequest);
        console.log(res.data.request)
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

  
  const filteredRequests =
    statusFilter == "all"
      ? myrequest
      : myrequest.filter(
          (req) => req?.donor_status?.toLowerCase() === statusFilter
        );
    return (
         <div className="p-4">
     
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold">
          My Donation Requests
        </h2>

        <select
          className="select select-bordered w-full md:w-52"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

    
      <div className="overflow-x-auto rounded-lg border border-base-300 bg-base-100">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Requester</th>
              <th>Hospital</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((my, index) => (
              <tr key={my?._id}>
                <td>{currentpage * 10 + index + 1 - 10}</td>
                <td>{my?.requesterName}</td>
                <td>{my?.hospitalName}</td>
                <td>
                  <span
                    className={`badge capitalize
                      ${my?.donor_status === "pending" && "badge-warning"}
                      ${my?.donor_status === "inprogress" && "badge-info"}
                      ${my?.donor_status === "done" && "badge-success"}
                      ${my?.donor_status === "canceled" && "badge-error"}
                    `}
                  >
                    {my?.donor_status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  No donation requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          className="btn btn-outline btn-sm"
          onClick={onlcickpre}
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              currentpage === page
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() => setCurrentpage(page)}
          >
            {page}
          </button>
        ))}

        <button
          onClick={onlcicknext}
          className="btn btn-outline btn-sm"
        >
          Next
        </button>
      </div>
    </div>
    );
};

export default AllRequests;