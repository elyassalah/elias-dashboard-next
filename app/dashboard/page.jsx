import React from "react";
import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import RightBar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import Chart from "../ui/dashboard/chart/chart";
import { fetchProducts, fetchUsers } from "../lib/data";

const DashboardPage = async () => {
  const { count, users } = await fetchUsers();
  const { countProduct, product } = await fetchProducts();

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card
            count={count}
            title={"Total Users"}
          />
          <Card
            count={countProduct}
            title={"Total Product"}
          />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <RightBar />
      </div>
    </div>
  );
};

export default DashboardPage;
