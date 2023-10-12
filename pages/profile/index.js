/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { FaPlus, FaStar } from "react-icons/fa";
import { PiPencilSimpleLineLight, PiPencilSimpleLight } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import dayjs from "dayjs";

import Layout from "../../components/layout/Layout";
import BackIcon from "/public/icons/backArrow";
import ProfileIcon from "/public/icons/profileIcon";
import UserIcon from "/public/icons/userIcon";
import ArrowDownIcon from "/public/icons/arrowDownIcon";
import ArrowUpIcon from "/public/icons/arrowUpIcon";
import AchievementIcon from "/public/icons/achievementIcon";
import CertificationIcon from "/public/icons/certificationIcon";
import CameraIcon from "/public/icons/cameraIcon";
import AddCertificateModal from "../../components/profile/AddCertificateModal";
import EditCertificateModal from "../../components/profile/EditCertificateModal";
import DeleteCertificateModal from "../../components/profile/DeleteCertificateModal";
import profileStore from "../../store/profile";
import userStore from "../../store/auth";
import certificateStore from "../../store/certificate";

const Profile = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { getAllCertificates, CertificateInfo: certificateInfo } =
    certificateStore((state) => state);
  const {
    getAllProfiles,
    ProfileInfo: profileInfo,
    loading,
  } = profileStore((state) => state);
  const { user } = userStore((state) => state);

  useEffect(() => {
    getAllProfiles({
      apolloClient,
      where: { userId: user.id },
    });
    getAllCertificates({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user, router]);

  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [personalEdit, setPersonalEdit] = useState(false);
  const [certificateEdit, setCertificateEdit] = useState(false);
  const [showAchievementDetail, setShowAchievementDetail] = useState(false);
  const [selectedImage, setSelectedImage] = useState(profileInfo[0]?.photo.url);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [addFavourite, setAddFavourite] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const addCertificateModal = () => {
    setModalOpen(!modalOpen);
  };

  const editCertificateModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const deleteCertificateModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

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
        <div
          css={styles.bodyContainer}
          style={{
            marginBottom: personalEdit ? "55px" : "",
          }}
        >
          <div css={styles.profileContent}>
            <div css={styles.attachBox}>
              {/* {selectedImage && (
                <div css={styles.imageContainer}>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    css={styles.selectedImage}
                  />
                </div>
              )} */}

              <label css={styles.attachBtn}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span>
                  <img
                    src={
                      profileInfo[0]?.photo.url
                        ? `${process.env.NEXT_PUBLIC_APP_URL}${profileInfo[0]?.photo.url}`
                        : "images/defaultImage.jpg"
                    }
                  />
                  <span css={styles.cameraIcon}>
                    <CameraIcon />
                  </span>
                </span>
              </label>
            </div>
            <p style={{ marginTop: "5px" }}>
              <label className="header-text">
                {profileInfo[0]?.firstName} {profileInfo[0]?.lastName}
              </label>
              <label className="secondary-text">
                Employee ID: {profileInfo[0]?.id}
              </label>
            </p>
            <div
              style={{ display: "none" }}
              css={styles.editIcon}
              onClick={() => setProfileEdit(true)}
              // style={{ display: profileEdit ? "none" : "block" }}
            >
              <PiPencilSimpleLineLight color="rgba(47, 72, 88, 1)" size={20} />
            </div>
            <div
              style={{ display: "none" }}
              css={styles.starIcon}
              onClick={() => {
                setAddFavourite(!addFavourite);
              }}
            >
              <FaStar size={20} color={addFavourite ? "#FA7E0B" : "#B3B3B3"} />
            </div>
          </div>

          <div css={styles.infoContent} style={{ marginTop: "90px" }}>
            <div css={styles.labelText} className="primary-text">
              <label onClick={() => setShowProfileDetail(!showProfileDetail)}>
                <UserIcon />
                Personal Information
              </label>
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "-40px",
                  display: profileEdit ? "block" : "none",
                }}
                onClick={() => {
                  setPersonalEdit(true);
                  setShowProfileDetail(true);
                }}
              >
                <PiPencilSimpleLineLight
                  color="rgba(47, 72, 88, 1)"
                  size={20}
                />
              </div>
              <div
                onClick={() => setShowProfileDetail(!showProfileDetail)}
                style={{ marginLeft: "auto" }}
              >
                <button>
                  {showProfileDetail ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
              </div>
            </div>
            <div style={{ display: showProfileDetail ? "block" : "none" }}>
              <div css={styles.formFlexDiv}>
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">Emaill</label>
                </div>
                <div css={styles.formFlexChildDiv}>
                  <input
                    type="email"
                    className="primary-text"
                    defaultValue={profileInfo[0]?.user.email}
                    disabled={!personalEdit}
                  />
                </div>
              </div>
              <div css={styles.formFlexDiv}>
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">Contact Number</label>
                </div>
                <div css={styles.formFlexChildDiv}>
                  <input
                    type="text"
                    className="primary-text"
                    defaultValue={profileInfo[0]?.contactNumber}
                    disabled={!personalEdit}
                  />
                </div>
              </div>
              <div css={styles.formFlexDiv}>
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">Position</label>
                </div>
                <div css={styles.formFlexChildDiv}>
                  <input
                    type="text"
                    className="primary-text"
                    defaultValue={profileInfo[0]?.position}
                    disabled={!personalEdit}
                  />
                </div>
              </div>
              <div css={styles.formFlexDiv}>
                <div css={styles.formFlexChildDiv}>
                  <label className="primary-text">Joined Date</label>
                </div>
                <div css={styles.formFlexChildDiv}>
                  <label>
                    <DatePicker
                      selected={
                        startDate
                          ? startDate
                          : profileInfo[0]?.joinDate
                          ? new Date(profileInfo[0]?.joinDate)
                          : ""
                      }
                      className="primary-text"
                      onChange={handleStartDateChange}
                      dateFormat="dd MMM yyyy"
                      disabled={!personalEdit}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div css={styles.infoContent}>
            <div
              css={styles.labelText}
              className="primary-text"
              style={{ marginBottom: "10px" }}
            >
              <label
                onClick={() => setShowAchievementDetail(!showAchievementDetail)}
              >
                <CertificationIcon />
                Certifications and Licenses
              </label>
              <div
                style={{
                  marginLeft: "auto",
                  display: profileEdit ? "block" : "none",
                }}
                onClick={() => {
                  setCertificateEdit(true);
                  setShowAchievementDetail(true);
                }}
              >
                <PiPencilSimpleLineLight
                  color="rgba(47, 72, 88, 1)"
                  size={20}
                />
              </div>
              <div
                style={{ marginLeft: "auto" }}
                onClick={() => setShowAchievementDetail(!showAchievementDetail)}
              >
                <button>
                  {showAchievementDetail ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
              </div>
            </div>
            <div style={{ display: showAchievementDetail ? "block" : "none" }}>
              {certificateInfo?.map((eachCertificate, index) => {
                return (
                  <div
                    className="d-flex"
                    style={{ margin: "5px 0" }}
                    key={index}
                  >
                    <div css={styles.certificateDetail}>
                      <label className="secondary-text">
                        <AchievementIcon /> {eachCertificate.name}
                      </label>
                      <span className="secondary-text">
                        Expired date:
                        {dayjs(eachCertificate.expiryDate).format("DD/MM/YYYY")}
                      </span>
                    </div>
                    <div
                      css={styles.actionBox}
                      style={{ display: certificateEdit ? "block" : "none" }}
                    >
                      <PiPencilSimpleLight
                        size={20}
                        color="rgba(47, 72, 88, 1)"
                        onClick={() => {
                          setSelectedCertificate(eachCertificate);
                          editCertificateModal();
                        }}
                      />
                      <RiDeleteBinLine
                        size={20}
                        color="rgba(236, 28, 36, 1)"
                        onClick={() => {
                          setSelectedCertificate(eachCertificate);
                          deleteCertificateModal();
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              {editModalOpen && (
                <EditCertificateModal
                  isOpen={editModalOpen}
                  close={() => setEditModalOpen(!editModalOpen)}
                  selectedCertificate={selectedCertificate}
                />
              )}
              {deleteModalOpen && (
                <DeleteCertificateModal
                  isOpen={deleteModalOpen}
                  close={() => setDeleteModalOpen(!deleteModalOpen)}
                  selectedCertificate={selectedCertificate}
                />
              )}
              <div
                className="header-text"
                css={styles.addBox}
                onClick={addCertificateModal}
              >
                <label>
                  <FaPlus color="var(--primary)" />
                </label>
                Add More
              </div>
              {modalOpen && (
                <AddCertificateModal
                  isOpen={modalOpen}
                  close={() => setModalOpen(!modalOpen)}
                  userId={user?.id}
                />
              )}
            </div>
          </div>
          <div
            css={styles.actionButton}
            style={{ display: personalEdit ? "block" : "none" }}
          >
            <div>
              <button
                css={styles.cancelBtn}
                onClick={() => {
                  setPersonalEdit(false);
                }}
              >
                Cancel
              </button>
              <button
                css={styles.addBtn}
                onClick={() => {
                  setPersonalEdit(false);
                }}
              >
                Confirm
              </button>
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
    align-items: center;
    background: var(--primary);
    height: 90px;
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
    top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 700px) {
      width: 90%;
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
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      svg {
        width: 25px;
        height: 25px;
      }
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
    input {
      border: none;
      background: none;
      outline: none;
      overflow: hidden;
    }
    .react-datepicker__input-container {
      position: unset;
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
    img {
      width: 60px;
      height: 60px;
      border-radius: 50px;
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
  addBox: css`
    color: var(--primary);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    cursor: pointer;
    label {
      width: 25px;
      height: 25px;
      border-radius: 4px;
      background: var(--secondary);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    svg {
      margin: 0;
      width: 18px;
      height: 18px;
    }
  `,
  editIcon: css`
    position: absolute;
    margin-top: -70px;
    right: 15px;
    cursor: pointer;
  `,
  starIcon: css`
    position: absolute;
    left: 15px;
    margin-top: -70px;
    cursor: pointer;
  `,
  actionBox: css`
    display: flex;
    margin-left: auto;
    gap: 10px;
    cursor: pointer;
  `,
  certificateDetail: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 25px;
    label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 5px;
      color: var(--lighter-gray);
      font-size: 18px;
    }
    span {
      margin-left: 18px;
      font-size: 16px;
    }
  `,
  actionButton: css`
    position: absolute;
    bottom: 70px;
    div {
      display: flex;
      gap: 60%;
    }
    button {
      border-radius: 10px;
      padding: 3px 20px;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
        0px 4px 6px 0px rgba(50, 50, 93, 0.11);
    }
  `,
  cancelBtn: css`
    border: 1px solid rgba(160, 174, 192, 1);
    color: var(--dark-gray);
  `,
  addBtn: css`
    border: none;
    color: var(--white);
    background: var(--primary);
  `,
};
