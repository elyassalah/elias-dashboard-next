import React from "react";
import styles from "./transactions.module.css";
import Image from "next/image";
const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Elyas Salah
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                {" "}
                Pending{" "}
              </span>
            </td>
            <td>14.2.2024</td>
            <td>$300</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Salah Hussain
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>
                {" "}
                Done{" "}
              </span>
            </td>
            <td>14.3.2024</td>
            <td>$400</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Elyas Mhd
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                {" "}
                Cancelled{" "}
              </span>
            </td>
            <td>14.5.2024</td>
            <td>$200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Elyas Salah
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                {" "}
                Pending{" "}
              </span>
            </td>
            <td>14.2.2024</td>
            <td>$300</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
