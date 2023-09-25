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
      <HeaderNoti title={'Attendance'} href={'/home'} />
      <div className='d-flex justify-content-between '>
        <p className='m-3'>Monday, 10th May 2023</p>
        <p className='m-3'>09:00:00</p>
      </div>

      <div class='m-3 '>
        <div class='row'>
          <div class='col-12'>
            <div class='form-group'>
              <label for='exampleTextarea'>
                <b>Add Comment</b>{' '}
              </label>
              <textarea
                class='form-control'
                id='exampleTextarea'
                rows='4'
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <button class='m-3 btn btn-primary' css={styles.wrapper}>
        Check In
      </button>

      <Card
        id={0}
        title={'Duty Schedule Detail'}
        body={
          <>
            <div class='container '>
              <div class='row'>
                <div class='col-md-6 d-flex align-items-center'>
                  <p>
                    <b>Date</b>{' '}
                  </p>
                  &ensp; <p>:</p> &ensp;
                  <p>10-05-2023</p>
                </div>
                <div class='col-md-6 d-flex align-items-center'>
                  <p>
                    <b>Time</b>{' '}
                  </p>
                  &ensp; <p>:</p> &ensp;
                  <p>9:00AM - 6:00PM</p>
                </div>
              </div>

              <div class='row'>
                <div class='col-md-12 d-flex align-items-center'>
                  <p>
                    <b>Report To</b>{' '}
                  </p>
                  &ensp; <p>:</p> &ensp;
                  <p>
                    {' '}
                    2715 Ash Dr.
                    <br />
                    San Jose, South Dakota 83475
                  </p>
                </div>
              </div>
            </div>
          </>
        }
        icon={<BatteryWarningIcon />}
      />
      <Card
        id={0}
        title={'Current Location'}
        body={<>address</>}
        icon={<BatteryWarningIcon />}
      />
    </Layout>
  );
};

export default index;

const styles = {
  wrapper: css`
    max-height: 82vh;
    overflow-y: scroll;
    background: var(--primary);
  `,
};
