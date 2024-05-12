const Page = () => {
  const handleForm = async (formData) => {
    // by using server every thing inside this function going to run on the sever
    "use server";
    console.log(formData);
    const username = formData.get("username");
    console.log(username );
    console.log("hello server");
  };
  return (
    <div>
      <form action={handleForm}>
        <input type="text" name="username" />
        <button>send</button>
      </form>
    </div>
  );
};

export default Page;
