"use client";
import React from "react";
/* we make this component cause in its page its sever and we need to implement some feature that is client
we prevent user from copy or cut or select this input field
*/
const ReadOnlyInput = ({ value }) => {
  const handleCopy = (e) => {
    e.preventDefault();
  };

  const handleCut = (e) => {
    e.preventDefault();
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };
  const inputStyle = {
    WebkitUserSelect: "none" /* Safari */,
    MozUserSelect: "none" /* Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
    userSelect: "none" /* Non-prefixed version */,
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <input
      type="hidden"
      name="id"
      value={value}
      readOnly
      onCopy={handleCopy}
      onCut={handleCut}
      onPaste={handlePaste}
      style={inputStyle}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ReadOnlyInput;
