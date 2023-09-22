import React from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/documents/Card";
import BatteryWarningIcon from "../../public/icons/batteryWarningIcon";
import LightningIcon from '../../public/icons/lightningIcon';

const index = () => {
  return (
    <Layout>
      <HeaderNoti title={"Documents"} href={'/home'}/>
      <Card
        id={0}
        title={"Initiate evacuation procedures"}
        body={
          "Activate the building evacuation alarm or PA system to alert occupants to evacuate Follow predetermined evacuation routes and assist others in exiting the building safely.Close doors and windows to help contain the fire, if safe to do so"
        }
        icon={<BatteryWarningIcon />}
      />
      <Card
        id={1}
        title={"Notify emergency services"}
        body={
          "Activate the building evacuation alarm or PA system to alert occupants to evacuate Follow predetermined evacuation routes and assist others in exiting the building safely.Close doors and windows to help contain the fire, if safe to do so"
        }
        icon={<LightningIcon />}
      />
      <Card
        id={2}
        title={"Initiate evacuation procedures"}
        body={
          "Activate the building evacuation alarm or PA system to alert occupants to evacuate Follow predetermined evacuation routes and assist others in exiting the building safely.Close doors and windows to help contain the fire, if safe to do so"
        }
        icon={<BatteryWarningIcon />}
      />
      <Card
        id={2}
        title={"Notify emergency services"}
        body={
          "Activate the building evacuation alarm or PA system to alert occupants to evacuate Follow predetermined evacuation routes and assist others in exiting the building safely.Close doors and windows to help contain the fire, if safe to do so"
        }
        icon={<LightningIcon />}
      />
    </Layout>
  );
};

export default index;
