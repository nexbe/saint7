/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
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

const Card = ({
  id,
  title,
  body,
  attachment,
  icon,
  isEdit,
  setEditModal,
  isDelete,
  handleCheck,
  isChecked,
  eachDocument,
  handleEdit,
}) => {
  const [open, setOpen] = useState('');

  const FILE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".jfif"];
  const isImage = attachment?.map((eachAttach) => {
    return FILE_EXTENSIONS.some((extension) =>
      eachAttach.name?.endsWith(extension)
    );
  });

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {}, [isChecked]);

  return (
    <Accordion open={open} toggle={toggle} css={styles.wrapper}>
      <AccordionItem>
        <AccordionHeader targetId={id} css={styles.item}>
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
                  onClick={() => handleCheck(id)}
                  checked={isChecked}
                  style={{ border: "2px solid #000" }}
                />
              </div>
            )}
            {title}
          </div>
          {isEdit && (
            <div
              style={{ marginLeft: "auto", cursor: "pointer" }}
              onClick={() => {
                handleEdit(id);
                setEditModal(true);
              }}
            >
              <EditPencil />
            </div>
          )}
        </AccordionHeader>
        <AccordionBody accordionId={id}>
          {body}
          <div className="fileIconContainer">
            {attachment &&
              attachment.map((eachAttach, index) => {
                return isImage[index] ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_APP_URL}${eachAttach?.url}`}
                  />
                ) : (
                  <PdfIcon />
                );
              })}
          </div>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
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
    .fileIconContainer svg, img {
      margin-top: 10px;
      width: 56px;
      height: 56px;
      margin-right: 10px;
    }
  `,
};
