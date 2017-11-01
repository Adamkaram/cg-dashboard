import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  statusCode: PropTypes.string.isRequired,
  requestedUrl: PropTypes.string.isRequired
};

const LogItem = ({ statusCode, requestedUrl }) => (
  <span className="activity_log-item_text">
    {statusCode} {requestedUrl}
  </span>
);

LogItem.propTypes = propTypes;

export default LogItem;
