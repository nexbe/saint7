/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useApolloClient, useMutation } from "@apollo/client";
import { FaPlus, FaStar } from "react-icons/fa";
import {
  PiPencilSimpleLineLight,
  PiPencilSimpleLight,
  PiPencilSimpleLineFill,
} from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

import Layout from "../../components/layout/Layout";
import BackIcon from "/public/icons/backArrow";
import UserIcon from "/public/icons/userIcon";
import ArrowDownIcon from "/public/icons/arrowDownIcon";
import ArrowUpIcon from "/public/icons/arrowUpIcon";
import AchievementIcon from "/public/icons/achievementIcon";
import CertificationIcon from "/public/icons/certificationIcon";
import CameraIcon from "/public/icons/cameraIcon";
import AddCertificateModal from "../../components/profile/AddCertificateModal";
import EditCertificateModal from "../../components/profile/EditCertificateModal";
import ViewCertificateModal from "../../components/profile/ViewCertificateModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import NotificationBox from "../../components/notification/NotiBox";
import profileStore from "../../store/profile";
import userStore from "../../store/user";
import authStore from "../../store/auth";
import certificateStore from "../../store/certificate";
import {
  UPDATE_PROFILE,
  CREATE_PROFILE,
} from "../../graphql/mutations/profile";
import { UPDATE_USER } from "../../graphql/mutations/user";
import { uploadFile } from "../../components/upload/upload";
import { DELETE_CERTIFICATE } from "../../graphql/mutations/certificate";
import EditPencil from "../../public/icons/editPencil";
import EditIcon from "../../public/icons/editIcon";
import Loading from "../../components/Loading";

const Profile = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { getAllCertificates, CertificateInfo: certificateInfo } =
    certificateStore((state) => state);
  const {
    getAllProfiles,
    ProfileInfo: profileInfo,
    updateProfile,
    loading,
  } = profileStore((state) => state);
  const { updateUser } = userStore((state) => state);
  const [updateProfileAction, { errUploadProfile }] =
    useMutation(UPDATE_PROFILE);
  const [createProfileAction] = useMutation(CREATE_PROFILE);
  const [updateUserAction] = useMutation(UPDATE_USER);
  const [deleteCertificateAction, { errDeleteCertificate }] =
    useMutation(DELETE_CERTIFICATE);
  const { user } = authStore((state) => state);

  const selectedProfile = !!router.query.userId
    ? profileInfo.filter((item) => {
        if (item?.user?.id === router.query.userId) return item;
      })
    : profileInfo;

  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [personalEdit, setPersonalEdit] = useState(false);
  const [certificateEdit, setCertificateEdit] = useState(false);
  const [showAchievementDetail, setShowAchievementDetail] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    profileInfo[0]?.joinDate ? new Date(profileInfo[0]?.joinDate) : new Date()
  );
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [addFavourite, setAddFavourite] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [image, setImage] = useState();
  const [editConfirm, setEditConfirm] = useState(false);

  useEffect(() => {
    if (!!router.query.userId) {
      getAllProfiles({
        apolloClient,
        where: { userId: router.query.userId },
      });
      getAllCertificates({
        apolloClient,
        where: { userId: router.query.userId },
      });
    } else {
      getAllProfiles({
        apolloClient,
        where: { userId: user.id },
      });
      getAllCertificates({
        apolloClient,
        where: { userId: user.id },
      });
    }
  }, [user, router]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const addCertificateModal = () => {
    setModalOpen(!modalOpen);
  };

  const editCertificateModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const viewCertificateModal = () => {
    setViewModalOpen(!viewModalOpen);
  };

  const deleteCertificateModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const favLists = selectedProfile[0]?.favoriteUsers?.map((eachUser) => {
    return +eachUser?.id;
  });

  useEffect(() => {
    if (profileInfo?.length > 0 && !!profileInfo[0]?.photo.url)
      setImage(
        `${process.env.NEXT_PUBLIC_APP_URL}${profileInfo[0]?.photo.url}`
      );
    setAddFavourite(favLists?.includes(+user?.id));
  }, [profileInfo[0]]);

  const onPreviewImage = async (e) => {
    const selectedImage = e.target.files[0];
    if (e.target.name === "file") {
      var file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append("files", selectedImage);
    formData.append("ref", "personal-information");
    const response = await uploadFile(formData);
    let json = await response.json();
    let imageId = json[0].id;

    if (!!profileInfo[0]?.id) {
      await updateProfileAction({
        variables: {
          id: profileInfo[0]?.id,
          data: {
            photo: imageId,
          },
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      await createProfileAction({
        variables: {
          data: {
            photo: imageId,
            user: user?.id,
            publishedAt: new Date().toISOString(),
          },
        },
      });
    }

    router.push({
      pathname: `/profile`,
      query: {
        message: !errUploadProfile ? "Success!" : "Apologies!",
        belongTo: !errUploadProfile ? "uploadProfileSuccess" : "error",
        label: "Your Personal Photo has successfully uploaded.",
        userId: router?.query ? router?.query?.userId : user?.id,
      },
    });
  };

  const onSubmit = async (data) => {
    if (!!editConfirm) {
      if (profileInfo.length > 0 && !!profileInfo[0].id) {
        await updateProfileAction({
          variables: {
            id: profileInfo[0]?.id,
            data: {
              contactNumber: data.contactNumber,
              position: data.position,
              joinDate: new Date(startDate).toISOString(),
            },
            updatedAt: new Date().toISOString(),
          },
        });
        await updateUser({
          updateUserAction,
          id: profileInfo[0]?.user?.id,
          userData: {
            email: data.email,
          },
        });
      } else {
        await createProfileAction({
          variables: {
            data: {
              contactNumber: data?.contactNumber,
              position: data?.position,
              joinDate: new Date(startDate)?.toISOString(),
              user: router?.query ? router?.query?.userId : user?.id,
              publishedAt: new Date().toISOString(),
            },
          },
        });
        await updateUser({
          updateUserAction,
          id: router?.query ? router?.query?.userId : user?.id,
          userData: {
            email: data.email,
          },
        });
        getAllProfiles({
          apolloClient,
          where: { userId: router?.query ? router?.query?.userId : user?.id },
        });
      }

      router.push({
        pathname: `/profile`,
        query: {
          message: "Success!",
          userId: router?.query ? router?.query?.userId : user?.id,
          label: "Your Personal Information has successfully updated.",
        },
      });
    } else {
      setValue("email", selectedProfile[0]?.user?.email ?? "");
      setValue("contactNumber", selectedProfile[0]?.contactNumber ?? "");
      setValue("position", selectedProfile[0]?.position ?? "");
      setStartDate(new Date(selectedProfile[0]?.joinDate ?? ""));
    }
  };

  const handleDeleteConfirm = async () => {
    await deleteCertificateAction({
      variables: { id: +selectedCertificate?.id },
    });
    router.push({
      pathname: ``,
      query: {
        message: !errDeleteCertificate ? "Success!" : "Apologies!",
        belongTo: !errDeleteCertificate ? "Certificate" : "error",
        label: selectedCertificate?.name + " has successfully deleted.",
        userId: router?.query ? router?.query?.userId : user?.id,
      },
    });
  };

  const onFavouriteChange = async (addFavourite) => {
    if (!!addFavourite) {
      await updateProfile({
        updateProfileAction,
        id: profileInfo[0]?.id,
        profileData: {
          favoriteUsers: [...favLists, user?.id],
        },
        updatedAt: new Date().toISOString(),
      });
    } else {
      await updateProfile({
        updateProfileAction,
        id: profileInfo[0]?.id,
        profileData: {
          favoriteUsers: favLists?.filter((eachFav) => {
            return eachFav != user?.id;
          }),
        },
        updatedAt: new Date().toISOString(),
      });
    }
    getAllProfiles({
      apolloClient,
      where: { userId: router.query.userId },
    });
  };

  console.log(selectedProfile[0].contactNumber);
  useEffect(() => {
    if (!!profileInfo && profileInfo?.length > 0) {
      const selectedProfile = !!router.query.userId
        ? profileInfo.filter((item) => {
            if (item?.user?.id === router.query.userId) return item;
          })
        : profileInfo;
      setValue("email", selectedProfile[0]?.user?.email ?? "");
      setValue("contactNumber", selectedProfile[0]?.contactNumber ?? "");
      setValue("position", selectedProfile[0]?.position ?? "");
    }
  }, [profileInfo, router?.query?.userId]);

  return (
    <Layout>
      <div css={styles.wrapper}>
        <div css={styles.headerContainer}>
          <div css={styles.backIcon} onClick={() => router.back()}>
            <BackIcon />
          </div>
          <label className="header-text">My Profile</label>
        </div>
        <div css={styles.bodyContainer}>
          <div css={styles.profileContent}>
            <NotificationBox
              message={router.query.message}
              timeout={3000}
              label={router?.query?.label}
            />
            <div css={styles.attachBox}>
              <label css={styles.attachBtn}>
                <span>
                  {selectedProfile[0]?.photo.url ? (
                    <img src={image} css={styles.roundedImage} alt="" />
                  ) : (
                    <img
                      src={"images/defaultImage.jpg"}
                      css={styles.roundedImage}
                    />
                  )}
                  <span css={styles.cameraIcon}>
                    <CameraIcon />
                  </span>
                </span>

                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  onChange={(e) => {
                    onPreviewImage(e);
                    setSelectedFiles(e.target.files[0]);
                  }}
                  disabled={
                    router?.query?.team === "Team" &&
                    profileInfo[0]?.user?.id != user?.id
                      ? true
                      : false
                  }
                />
              </label>
            </div>
            <p style={{ marginTop: "5px" }}>
              <label className="header-text">
                {!!selectedProfile[0]?.firstName ||
                !!selectedProfile[0]?.lastName
                  ? (selectedProfile[0]?.firstName ?? "") +
                    (selectedProfile[0]?.firstName ? " " : "") +
                    (selectedProfile[0]?.lastName ?? "")
                  : selectedProfile[0]?.user?.username}
              </label>
              <label className="secondary-text">
                Employee ID: {selectedProfile[0]?.id}
              </label>
            </p>
            <div
              css={styles.editIcon}
              onClick={() => setProfileEdit(!profileEdit)}
              style={{
                display:
                  router.query.team === "Team" ||
                  user?.role?.name.toLowerCase() != "guard"
                    ? "block"
                    : "none",
              }}
            >
              {profileEdit ? (
                <PiPencilSimpleLineFill color="var(--primary)" size={20} />
              ) : (
                <PiPencilSimpleLineLight
                  color="rgba(47, 72, 88, 1)"
                  size={20}
                />
              )}
            </div>
            <div
              style={{
                display:
                  router.query.team === "Team" &&
                  user?.role?.name.toLowerCase() != "guard"
                    ? "block"
                    : "none",
              }}
              css={styles.starIcon}
              onClick={() => {
                setAddFavourite(!addFavourite);
                onFavouriteChange(!addFavourite);
              }}
            >
              <FaStar size={20} color={addFavourite ? "#FA7E0B" : "#B3B3B3"} />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    setPersonalEdit(!personalEdit);
                    setShowProfileDetail(true);
                  }}
                >
                  {personalEdit ? (
                    <PiPencilSimpleLineFill color="var(--primary)" size={20} />
                  ) : (
                    <PiPencilSimpleLineLight
                      color="rgba(47, 72, 88, 1)"
                      size={20}
                    />
                  )}
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
                    <label className="primary-text">Email</label>
                  </div>
                  <div css={styles.formFlexChildDiv}>
                    <input
                      type="email"
                      className="primary-text"
                      disabled={!personalEdit}
                      {...register("email", {
                        required: false,
                      })}
                    />
                  </div>
                </div>
                <div css={styles.formFlexDiv}>
                  <div css={styles.formFlexChildDiv}>
                    <label className="primary-text">Contact Number</label>
                  </div>
                  <div css={styles.formFlexChildDiv}>
                    <input
                      type={selectedProfile?.[0]?.contactNumber ? 'string' : 'number'}
                      min={0}
                      onWheel={(event) => event.currentTarget.blur()}
                      className="primary-text"
                      disabled={!personalEdit}
                      {...register("contactNumber", {
                        required: false,
                      })}
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
                      disabled={!personalEdit}
                      {...register("position", {
                        required: false,
                      })}
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
                        selected={startDate}
                        className="primary-text"
                        onChange={handleStartDateChange}
                        dateFormat="dd MMM yyyy"
                        disabled={!personalEdit}
                        showYearDropdown
                        popperPlacement="top"
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
                  onClick={() =>
                    setShowAchievementDetail(!showAchievementDetail)
                  }
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
                    setCertificateEdit(!certificateEdit);
                    setShowAchievementDetail(true);
                  }}
                >
                  {certificateEdit ? (
                    <PiPencilSimpleLineFill color="var(--primary)" size={20} />
                  ) : (
                    <PiPencilSimpleLineLight
                      color="rgba(47, 72, 88, 1)"
                      size={20}
                    />
                  )}
                </div>
                <div
                  style={{ marginLeft: "auto" }}
                  onClick={() =>
                    setShowAchievementDetail(!showAchievementDetail)
                  }
                >
                  <button>
                    {showAchievementDetail ? (
                      <ArrowUpIcon />
                    ) : (
                      <ArrowDownIcon />
                    )}
                  </button>
                </div>
              </div>
              <div
                style={{ display: showAchievementDetail ? "block" : "none" }}
              >
                {certificateInfo?.map((eachCertificate, index) => {
                  return (
                    <div
                      className="d-flex"
                      style={{ margin: "5px 0" }}
                      key={index}
                    >
                      <div
                        css={styles.certificateDetail}
                        onClick={() => {
                          setSelectedCertificate(eachCertificate);
                          viewCertificateModal();
                        }}
                      >
                        <label className="secondary-text">
                          <AchievementIcon /> {eachCertificate.name}
                        </label>
                        <span className="secondary-text">
                          Expired date:
                          {dayjs(eachCertificate.expiryDate).format(
                            "DD/MM/YYYY"
                          )}
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
                          style={{ marginRight: "3px" }}
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

                {deleteModalOpen && (
                  <DeleteModal
                    isOpen={deleteModalOpen}
                    close={() => setDeleteModalOpen(!deleteModalOpen)}
                    handleDeleteConfirm={handleDeleteConfirm}
                    selectedData={[selectedCertificate]}
                    belongTo={"certificate"}
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
                    userId={
                      router?.query?.userId ? router?.query?.userId : user?.id
                    }
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
                    setEditConfirm(false);
                    setPersonalEdit(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  css={styles.addBtn}
                  onClick={() => {
                    setPersonalEdit(false);
                    setEditConfirm(true);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {editModalOpen && (
        <EditCertificateModal
          isOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          selectedCertificate={selectedCertificate}
          userId={router?.query?.userId ? router?.query?.userId : user?.id}
        />
      )}
      {viewModalOpen && (
        <ViewCertificateModal
          isOpen={viewModalOpen}
          close={() => setViewModalOpen(!viewModalOpen)}
          selectedCertificate={selectedCertificate}
        />
      )}
      {loading && <Loading isOpen={loading} />}
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
    margin: 10px;
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
    margin-top: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 110px;
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
    .react-datepicker {
      span {
        color: #000;
        font-weiht: 700;
        font-size: 16px;
      }
    }
    .react-datepicker__triangle {
      display: none;
    }
    .react-datepicker__navigation-icon--next {
      top: 11px;
      left: -10px;
      font-size: 16px;
    }
    .react-datepicker__navigation-icon--previous {
      top: 11px;
      left: 5px;
      font-size: 16px;
    }
    .react-datepicker__year-read-view--down-arrow {
      top: 7px;
      font-size: 16px;
      border-color: none;
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
    z-index: 0;
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
    padding-bottom: 15px;
    input {
      display: none;
      position: relative;
      margin-top: -30px;
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
    cursor: pointer;
    width: 15%;
  `,
  certificateDetail: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 25px;
    width: 80%;
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
    div {
      display: flex;
      justify-content: space-between;
    }
    display: flex;
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
    border: 1px solid rgba(41, 57, 145, 1);
    color: var(--primary);
    background: var(--white);
  `,
  addBtn: css`
    border: none;
    color: var(--white);
    background: var(--primary);
  `,
};
