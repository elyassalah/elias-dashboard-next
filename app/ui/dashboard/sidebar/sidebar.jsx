import React from "react";
import styles from "./sidebar.module.css";
import { menuItems } from "../../../constants/sidebar.const";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { auth, signOut } from "../../../auth";

const Sidebar = async () => {
  // or {user} = await auth() cause auth return session.user we can destruct user only
  const session = await auth();
  console.log(session);
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={session.user.img || "/noavatar.png"}
          alt=""
          width={50}
          height={50}
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{session.user.username}</span>
          <span className={styles.userTitle}>
            {session.user.isAdmin === true ? "Admin" : "User"}
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((category) => (
          <li key={category.title}>
            <span className={styles.category}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLink
                key={item.title}
                item={item}
              />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          // embedded server action
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
