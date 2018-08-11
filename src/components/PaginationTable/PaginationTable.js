import React from "react";
import PropTypes from "prop-types";
import "./PaginationTable.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

const defaultOptions = {
  defaultPageSize: 10
};

const PaginationTable = props => {
  const { data, options, visibleColumns } = props;

  const columns = visibleColumns.map(key => ({
    Header: key,
    accessor: key
  }));

  return (
    <div className="pagination-table">
      <ReactTable
        data={data}
        columns={columns}
        {...{ ...defaultOptions, ...options }}
      />
    </div>
  );
};

PaginationTable.props = {
  data: PropTypes.array.isRequired,
  visibleColumns: PropTypes.array.isRequired,
  options: PropTypes.object
};

export default PaginationTable;
