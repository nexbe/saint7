/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
} from "reactstrap";
import EditPencil from "../../public/icons/editPencil";

const Card = ({ id, title, body, icon, isEdit , setEditModal, isDelete}) => {
  const [open, setOpen] = useState();
  const [isChecked, setIsChecked] = useState();

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <Accordion open={open} toggle={toggle} css={styles.wrapper}>
      <AccordionItem>
        <AccordionHeader targetId={id} css={styles.item}>
          {!isDelete ? icon : <div css={styles.checkBoxStyle}>
            <Input 
              type="checkbox"
              id="status"
              name="status"
              checked={isChecked}
              style={{ border: "2px solid #000" }}
            />
          </div>} 
          {title}
          {isEdit && (
            <div style={{ marginLeft: "auto", cursor: "pointer" }} onClick={() => setEditModal(true)}>
              <EditPencil />
            </div>
          )}
        </AccordionHeader>
        <AccordionBody accordionId={id}>{body}</AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Card;

const styles = {
  wrapper: css`
    margin: 12px;
    .accordion-item {
      padding: 10px;
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
      line-height: 20px;
    }
    .accordion-body {
      font-size: 16px;
      font-weight: 400;
      line-height: normal;
    }
  `,
};
