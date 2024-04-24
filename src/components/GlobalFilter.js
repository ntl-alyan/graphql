import React from "react";

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <div className="col-sm-12 col-md-6 text-sm-left text-lg-right">
      <p className="py-0 pl-1 m-0 padding-right-pc weight-500">Search</p>
      <input className="border-0 rounded px-3 py-2 font-12" placeholder="Search here" 
      style={{backgroundColor:"#f7f7f7", width:'170px'}} value={filter || ""} onChange={(e) => setFilter(e.target.value)} /> 
    </div>
  );
}
