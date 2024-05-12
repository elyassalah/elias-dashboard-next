import React from "react";
import styles from "./card.module.css";
import { MdSupervisedUserCircle } from "react-icons/md";
import { fetchUsers } from "../../../lib/data";
const Card = async ({ count , title}) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{count}</span>
        <span className={styles.detail}>
          <span className={styles.positive}>%12</span>
          increase than before month
        </span>
      </div>
    </div>
  );
};

export default Card;
