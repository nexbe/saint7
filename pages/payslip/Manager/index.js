/** @jsxImportSource @emotion/react */
import React from "react";
import Layout from "../../../components/layout/Layout";
import HeaderNoti from "../../../components/layout/HeaderNoti";
import PayUser from "../../../components/payslip/payUser";

const Payslip = () => {
  return (
    <Layout>
      <HeaderNoti title={"Payslip"} href={"/home"} />

      <PayUser />
    </Layout>
  );
};

export default Payslip;
