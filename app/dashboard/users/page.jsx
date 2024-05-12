import styles from "../../ui/dashboard/users/users.module.css";
import React from "react";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../../ui/dashboard/pagination/pagination";
import AddUserDialog from "../../ui/dashboard/users/addUser/addUser";
import { fetchUsers } from "../../lib/data";
import { deleteUser } from "../../lib/actions";
import { auth } from "../../auth";
const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);
  const showDialog = searchParams?.showDialog;
  // test error on server component
  const session = await auth();
  // if (!session.isAdmin) return <Error errorMessage="You are not admin"/>;
  // if (!session.isAdmin) {
  //   throw new Error("you are not admin");
  // }

  // const count = users.length; not work cause users return just 2 user for first page we use another query to return all count of users
  // console.log(users);
  // console.log(showDialog);
  return (
    <div className={styles.container}>
      {/* we were have error here when we use here the hooks pathname and search params cause this server component
      so we separate it in AddUserDialog component and make it client component to keep here server component */}
      {showDialog && <AddUserDialog />}
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        {/* here we change the url also we can use set params like search 
        to change the url to show the dialog all is server components */}
        <Link href="/dashboard/users?showDialog=y">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "Active" : "Passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input
                      type="hidden"
                      name="id"
                      value={user._id.toString()}
                    />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
