import React from "react";
import styles from "./addUser.module.css";
// import { useSearchParams } from "next/navigation";
import { addUser } from "../../../../lib/actions";

const AddUserDialog = () => {
  /* bellow makes error when use hooks cause we wanna it server component not client 
    to implement the server actions
    so we make it server without any client features and then in user pages we just
    modify the utl with add showDialog query 
    then we can use addUser actions successfully
  */
  // const searchParams = useSearchParams();
  // const showDialog = searchParams?.showDialog;
  // console.log(searchParams);
  return (
    // showDialog === "y" && (
    <div className={styles.dialog}>
      <div className={styles.container}>
        <form
          action={addUser}
          className={styles.form}
        >
          {/* name important cause we will push this item into db using this name */}
          <input
            type="text"
            placeholder="username"
            name="username"
            required
          />
            <input
              type="email"
              placeholder="email"
              name="email"
              required
            />

          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
          <input
            type="phone"
            placeholder="phone"
            name="phone"
            required
          />
          <select
            name="isAdmin"
            id="isAdmin"
          >
            <option value={false}>Is Admin?</option>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          <select
            name="isActive"
            id="isActive"
          >
            <option value={false}>Is Active?</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <textarea
            name="address"
            id="address"
            rows="16"
            placeholder="Address"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    // )
  );
};

export default AddUserDialog;
