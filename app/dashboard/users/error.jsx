"use client";
const Error = ({ error }) => {
  // with name this file error.jsx user can use url and go to it , but if we make it _error.jsx its cannot , but its not work 
  // there is error you will fix it later
  // console.log(errorMessage);
  return <div>{error.message}</div>;
};


export default Error;
