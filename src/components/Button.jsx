import React from "react";
import PropTypes from "prop-types";

const Button = ({ setDateFormat, item, dateFormat }) => {
  const renderButtonSelect = (button) => {
    const classes = "btn m-1 ";
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setDateFormat(item)}
        className={renderButtonSelect(item)}
      >
        {item}
      </button>
    </React.Fragment>
  );
};

export default Button;

Button.prototype = {
  setDateFormat: PropTypes.func,
  item: PropTypes.string,
  dateFormat: PropTypes.string,
};
