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
    <Layout className='container '>
      <HeaderNoti title={'Check In'} href={'/attendance'} />
      <div className='text-center container'>
        <div className='text-start'>
          <label for='image-description' className='m-3 '>
            Please make sure face is align in the frame
          </label>
        </div>
        <div className='row text-center'>
          <img
            src='/Group 517347097.png'
            alt='ScanFace'
            className='img-fluid'
          />
          <div className='m-3'>
            <button className='w-100 ' css={styles.wrapper}>
              Scan Your Face
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;

const styles = {
  wrapper: css`
    background: var(--primary);
    color: var(--white);
  `,
};
