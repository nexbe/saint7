/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { css } from "@emotion/react";
import CloseIcon from "../../public/icons/closeIcon";
import attendenceStore from "../../store/attendance";

const SiteModal = ({
  isOpen,
  setModal,
  setViewDutyModal,
  filteredData,
  siteData,
}) => {
  const close = () => {
    setModal(!isOpen);
  };

  console.log(siteData);

  return (
    <Modal isOpen={isOpen} toggle={close} css={styles.wrapper}>
      <div onClick={() => close()} style={{ textAlign: "end" }}>
        <CloseIcon />
      </div>
      <div css={styles.actions}>
        <h3>{siteData?.attributes?.name} Assigned Members</h3>
      </div>
      <div css={styles.lists}>
        {filteredData &&
          filteredData.map((attendance, index) => {
            return (
              <div css={styles.container} key={index}>
                <div>
                  <img
                    id={attendance?.id}
                    src={
                      attendance?.attributes?.users_permissions_user?.data
                        ?.attributes?.facialScanImage?.data?.attributes?.url
                        ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.users_permissions_user?.data?.attributes?.facialScanImage?.data?.attributes?.url}`
                        : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <span>
                    {
                      attendance?.attributes?.users_permissions_user?.data
                        ?.attributes?.username
                    }
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </Modal>
  );
};

export default SiteModal;

const styles = {
  wrapper: css`
    margin-top: 50%;
    padding: 20px;
    border-radius: 16px;
    background: #fff;
    color: var(--primary-font);
    .modal-content {
      border: none;
    }
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    @media (min-width: 440px) {
      margin-top: 5%;
    }
  `,
  actions: css`
    align-self: center;
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
    div {
      cursor: pointer;
    }
  `,
  container: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    align-items: center;
    span {
      color: #386fff;
      margin-left: 9px;
    }
    div {
      color: var(--primary);
    }
  `,
  lists: css`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    gap: 20px;
    max-height: 40vh;
    overflow-y: scroll;
  `,
};
