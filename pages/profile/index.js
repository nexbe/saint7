/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import BackIcon from "/public/icons/backArrow";
import ProfileIcon from "/public/icons/profileIcon";
import UserIcon from "/public/icons/userIcon";
import ArrowDownIcon from "/public/icons/arrowDownIcon";
import ArrowUpIcon from "/public/icons/arrowUpIcon";
import AchievementIcon from "/public/icons/achievementIcon";
import CertificationIcon from "/public/icons/certificationIcon";
import CameraIcon from "/public/icons/cameraIcon";

const Profile = () => {
  const router = useRouter();
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [showAchievementDetail, setShowAchievementDetail] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <div css={styles.headerContainer}>
          <div css={styles.backIcon} onClick={() => router.push("/home")}>
            <BackIcon />
          </div>
          <label className="header-text">My Profile</label>
        </div>
        <div css={styles.bodyContainer}>
          <div css={styles.profileContent}>
            <div css={styles.attachBox}>
              {selectedImage && (
                <div css={styles.imageContainer}>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    css={styles.selectedImage}
                  />
                </div>
              )}

              <label css={styles.attachBtn}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {!selectedImage && (
                  <span>
                    <ProfileIcon />
                    <span css={styles.cameraIcon}>
                      <CameraIcon />
                    </span>
                  </span>
                )}
              </label>
            </div>
            <p style={{ marginTop: "5px" }}>
              <label className="header-text">John Smith</label>
              <label className="secondary-text">Employee ID: 123456789</label>
            </p>
          </div>
          <div css={styles.infoContent} style={{ marginTop: "90px" }}>
            <div
              css={styles.labelText}
              onClick={() => setShowProfileDetail(!showProfileDetail)}
            >
              <UserIcon />
              Personal Information
              <button>
                {showProfileDetail ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </button>
            </div>
            <div style={{ display: showProfileDetail ? "block" : "none" }}>
              <div css={styles.formFlexDiv}>
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">Emaill</label>
                </div>
                <div css={styles.formFlexChildDiv}>
                  <span className="primary-text">tanarak@gmail.com</span>
                </div>
              </div>
              <div css={styles.formFlexDiv}>
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">Contact Number</label>
                </div>
                <div css={styles.formFlexChildDiv}>
                  <span className="primary-text">+66 888 555 6987</span>
                </div>
              </div>
              <div css={styles.formFlexDiv}>
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">Position</label>
                </div>
                <div css={styles.formFlexChildDiv}>
                  <span className="primary-text">Security Supervisor</span>
                </div>
              </div>
              <div css={styles.formFlexDiv}>
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">Joined Date</label>
                </div>
                <div css={styles.formFlexChildDiv}>
                  <span className="primary-text">12th Feb 2022</span>
                </div>
              </div>
            </div>
          </div>
          <div css={styles.infoContent}>
            <div
              css={styles.labelText}
              onClick={() => setShowAchievementDetail(!showAchievementDetail)}
            >
              <CertificationIcon />
              Certifications and Licenses
              <button>
                {showAchievementDetail ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </button>
            </div>
            <div style={{ display: showAchievementDetail ? "block" : "none" }}>
              <div
                css={styles.formFlexDiv}
                style={{
                  border: "none",
                  paddingTop: "0",
                }}
              >
                <div css={styles.formFlexChildDiv}>
                  <label className="secondary-text">
                    Certifications and Licenses
                  </label>
                </div>
              </div>
              <div
                css={styles.formFlexDiv}
                style={{
                  border: "none",
                  paddingTop: "0",
                }}
              >
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">
                    <AchievementIcon /> Licensed Security Guard (USA)
                  </label>
                </div>
              </div>
              <div
                css={styles.formFlexDiv}
                style={{
                  border: "none",
                  paddingTop: "0",
                }}
              >
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">
                    <AchievementIcon />
                    First Aid and CPR Certification
                  </label>
                </div>
              </div>
              <div
                css={styles.formFlexDiv}
                style={{
                  border: "none",
                  paddingTop: "0",
                }}
              >
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">
                    <AchievementIcon />
                    Defensive Tactics Training
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--background);
  `,
  headerContainer: css`
    display: flex;
    justify-content: center;
    padding-top: 7px;
    background: var(--primary);
    min-height: 70px;
    border-radius: 20px 20px 0 0;
  `,
  backIcon: css`
    position: absolute;
    cursor: pointer;
    left: 20px;
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 200px;
    margin: 20px;
    font-family: Inter;
    font-style: normal;
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
    @media (max-width: 1400px) {
      margin: 20px;
    }
    @media (min-width: 1400px) {
      margin: 30px;
    }
  `,
  profileContent: css`
    display: flex;
    border-radius: 10px;
    background: var(--mobile-color-usage-white, #fff);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    position: absolute;
    top: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 700px) {
      width: 92%;
    }
    @media (min-width: 700px) {
      width: 96%;
    }
    p {
      padding-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      label {
        line-height: 25px;
      }
    }
    .header-text {
      color: var(--primary-font);
      text-transform: capitalize;
    }
    .secondary-text {
      color: var(--light-gray);
    }
  `,
  cameraIcon: css`
    position: absolute;
    margin-top: -18px;
    margin-left: 40px;
    background: #d9d9d9;
    border-radius: 50px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 13px;
      height: 13px;
    }
  `,
  infoContent: css`
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    margin-bottom: 15px;
    border-radius: 10px;
    background: var(--mobile-color-usage-white, #fff);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    svg {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  `,
  labelText: css`
    display: flex;
    align-items: center;
    cursor: pointer;
    button {
      border: none;
      background: none;
      margin-left: auto;
    }
  `,
  formFlexDiv: css`
    display: flex;
    justify-content: fit-content;
    width: 100%;
    flex-direction: column;
    padding-top: 10px;
    border-bottom: 2px solid #d9d9d9;
    :last-child {
      border: none;
    }
  `,
  formFlexChildDiv: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    label {
      color: var(--light-gray);
    }
    svg {
      width: 15px;
      height: 15px;
    }
  `,
  selectedImage: css`
    width: 55px;
    height: 55px;
    border-radius: 50px;
    position: absolute;
    margin-top: -10px;
    margin-left: -25px;
  `,
  attachBox: css`
    position: absolute;
    margin-top: -80px;
    cursor: pointer;
    svg {
      width: 60px;
      height: 60px;
    }
  `,
  attachBtn: css`
    input {
      display: none;
      position: relative;
      margin-top: -40px;
      margin-left: -7px;
      width: 60px;
      height: 60px;
      z-index: 1;
    }
  `,
};
