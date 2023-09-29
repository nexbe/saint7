/** @jsxImportSource @emotion/react */
import React from 'react';
import Layout from '../../components/layout/Layout';
import HeaderNoti from '../../components/layout/HeaderNoti';
import Card from '../../components/documents/Card';
import BatteryWarningIcon from '../../public/icons/batteryWarningIcon';
import LightningIcon from '../../public/icons/lightningIcon';
import { css } from '@emotion/react';

const index = () => {
  return (
    <Layout>
      <HeaderNoti title={'E-Leave'} href={'/home'} />
      <div css={styles.wrapper}>E-leave</div>
    </Layout>
  );
};

export default index;

const styles = {
  wrapper: css`
    max-height: 82vh;
    overflow-y: scroll;
  `,
};
