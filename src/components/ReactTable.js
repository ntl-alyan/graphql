import React, { useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { CSVLink } from "react-csv";

function ReactTable({
  columns,
  data,
  includeDownload = false,
  downloadFileName = "",
  includeColumnAccessors = [],
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  } = useTable({ columns, data }, useGlobalFilter, usePagination);
  const { globalFilter, pageIndex, pageSize } = state;

  const includedColumnIds = ["USER_ID"];

  // Function to format data for CSV export
  const formatDataForExport = () => {
    const formattedRow = {};
    const formattedData = rows.map((row,rowIndex) => {
      const formattedRow = {};
      prepareRow(row); //
      row.cells.forEach((cell, index) => {
        const columnId = cell.column.id;
        if (includeColumnAccessors.includes(columnId)) {
          if(typeof cell.value == 'object' && data?.[rowIndex]?.[columnId+"_CSV"]) {
            formattedRow[columnId] = data[rowIndex][columnId+"_CSV"];
          }
          else {
            formattedRow[columnId] = cell.value;
          }
        }
      });
      return formattedRow;
    });
    return formattedData;
  };

  return (
    <>
      {includeDownload && (
        <CSVLink
          data={formatDataForExport()}
          filename= {downloadFileName+".csv"}
          className=" btn btn-primary"
        >
          Download CSV
        </CSVLink>
      )}
      <div className="row mt-3 mb-1">
        <div className="col-sm-12 col-md-6">
          <p className="p-0 m-0 weight-400">Show Entries</p>
          <select
            style={{ width: "170px", background: "#f7f7f7" }}
            className="rounded text-left border-0 pl-2 py-2 font-12"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 50, 100, 500, "All"].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize !== "All" ? pageSize : 10000}
              >
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="table-wrap mt-4">
        <div className="table-responsive rounded rowset">
          <table className="table table-hover  " {...getTableProps()}>
            <thead className="custom-light-bg-color ">
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, j) => (
                    <th
                      style={{ whiteSpace: "nowrap" }}
                      key={j}
                      {...column.getHeaderProps()}
                      className="text-dark text-left pl-3 pr-2 py-2 font-15 weight-500"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, j) => {
                      return (
                        <td
                          key={j}
                          {...cell.getCellProps()}
                          className="font-13 weight-400 pl-3 pr-2 py-2"
                        >

                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-10">
        <span className="font-14 d-inline-block mb-2">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <span style={{ float: "right" }}>
          <button
            style={{ marginLeft: "5px", fontSize: "14px" }}
            className="btn btn-default bg-white text-dark border-secondary btn-fixed-width"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            className="btn btn-primary btn-fixed-width"
            style={{
              background: "#284E93",
              marginLeft: "5px",
              fontSize: "14px",
            }}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
        </span>
      </div>
    </>
  );
}

export default ReactTable;
