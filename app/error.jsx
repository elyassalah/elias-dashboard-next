"use client";
/*
 i think that this page error that handle the error on sever component
 cause in client component we can make the error return and handle it in the component
*/
const Error = ({ errorMessage }) => {
  console.log(errorMessage);
  return (
    <div>
      <h1>From App root</h1>
      {errorMessage}
    </div>
  );
};

Error.getInitialProps = ({ error }) => {
  const statusCode = error ? error.statusCode : 404;
  const errorMessage = error ? error.message : "An error occurred";
  return { statusCode, errorMessage };
};

export default Error;
