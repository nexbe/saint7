/** @jsxImportSource @emotion/react */
import React from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import History from "../../components/payslip/history/History";

const Payslip = () => {
  return (
    <Layout>
      <HeaderNoti title={"Payslip"} href={"/home"} />
      <History />
    </Layout>
  );
};


export default Payslip;

