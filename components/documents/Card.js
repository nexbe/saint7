/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
} from "reactstrap";

import EditPencil from "../../public/icons/editPencil";
import PdfIcon from "../../public/icons/pdfIcon";
import InvoiceImageModal from "../../components/claims/InvoiceImageModal";

const Card = ({
  icon,
  isEdit,
  setEditModal,
  isDelete,
  handleCheck,
  isChecked,
  setSelectedDocument,
  eachDocument,
}) => {
  const [open, setOpen] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);

  const imageModal = () => {
    setOpenImageModal(!openImageModal);
  };

  const FILE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".jfif"];
  const isImage = eachDocument?.attachment?.map((eachAttach) => {
    return FILE_EXTENSIONS.some((extension) =>
      eachAttach.name?.endsWith(extension)
    );
  });

  const imageList = eachDocument?.attachment?.filter(
    (eachDoc, index) => isImage[index]
  );

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {}, [isChecked]);

  const onButtonClick = (eachAttach) => {
    if (!!eachAttach) {
      let attachUrl = eachAttach.url;
      let attachName = eachAttach.name;
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}${attachUrl}`, {
        method: "GET",
      })
        .then((response) => {
          response.blob().then((blob) => {
            const fileURL = window.URL.createObjectURL(blob);
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = attachName;
            alink.click();
          });
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <Accordion open={open} toggle={toggle} css={styles.wrapper}>
        <AccordionItem>
          <AccordionHeader targetId={eachDocument?.id} css={styles.item}>
            <div style={{ width: "80%", gap: "5px" }} className="d-flex">
              {" "}
              {!isDelete ? (
                icon
              ) : (
                <div css={styles.checkBoxStyle}>
                  <Input
                    type="checkbox"
                    id="status"
                    name="status"
                    onClick={() => handleCheck(eachDocument?.id)}
                    checked={isChecked}
                    style={{ border: "2px solid #000" }}
                  />
                </div>
              )}
              {eachDocument?.title}
            </div>
            {isEdit && (
              <div
                style={{ marginLeft: "auto", cursor: "pointer" }}
                onClick={() => {
                  setSelectedDocument(eachDocument);
                  setEditModal(true);
                }}
              >
                <EditPencil />
              </div>
            )}
          </AccordionHeader>
          <AccordionBody accordionId={eachDocument?.id}>
            {eachDocument?.description}
            <div className="fileIconContainer">
              {eachDocument?.attachment &&
                eachDocument?.attachment.map((eachAttach, index) => {
                  return (
                    isImage[index] == false && (
                      <div onClick={() => onButtonClick(eachAttach)}>
                        <PdfIcon />
                      </div>
                    )
                  );
                })}
              {imageList.length > 0 && (
                <div onClick={imageModal} style={{ cursor: "pointer" }}>
                  <img
                    style={{ opacity: imageList?.length > 1 ? "0.7" : "1" }}
                    src={`${process.env.NEXT_PUBLIC_APP_URL}${imageList[0]?.url}`}
                  />
                  {imageList?.length > 1 && (
                    <span css={styles.imageCount}>+{imageList?.length}</span>
                  )}
                  {openImageModal && (
                    <InvoiceImageModal
                      attachment={imageList}
                      isOpen={openImageModal}
                      close={() => setOpenImageModal(!openImageModal)}
                    />
                  )}
                </div>
              )}
            </div>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Card;

const styles = {
  wrapper: css`
    margin: 12px;
    .accordion-item {
      padding: 0;
      border: 1px solid transparent;
      box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
      
    }
    .accordion-button:not(.collapsed) {
      background: #fff;
    }
    .accordion-button:focus {
      border-color: transparent;
      box-shadow: none;
    }
    .accordion-button {
      gap: 10px;
      font-size: 16px;
      font-weight: 600;
      var(--primary-font);
      line-height: 20px;
      
    }
    .accordion-body {
      font-size: 16px;
      var(--primary-font);
      font-weight: 400;
      line-height: normal;
    }
    .fileIconContainer {
      display: flex;
    }
    .fileIconContainer svg, img {
      margin-top: 10px;
      width: 56px;
      height: 56px;
      margin-right: 10px;
    }
  `,
  imageCount: css`
    position: relative;
    margin-top: -35px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  `,
};
