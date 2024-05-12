import Link from "next/link";
const Homepage = () => {
  return (
    <div>
      <h1>home page</h1>

      <Link href={"/login"}>Log in</Link>
    </div>
  );
};

export default Homepage;
