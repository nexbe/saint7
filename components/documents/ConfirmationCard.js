/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import ClickBoardText from "../../public/icons/clickboardText";

const ConfirmationCard = () => {
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <>
      <Accordion open={open} toggle={toggle} css={styles.wrapper}>
        <AccordionItem>
          <AccordionHeader targetId="acceptance" css={styles.item}>
            <div style={{ width: "80%", gap: "5px" }} className="d-flex">
              {" "}
                <ClickBoardText />
                Acceptance Confirmation
            </div>
          </AccordionHeader>
          <AccordionBody accordionId="acceptance">
             <div css={styles.card}>
               <span>Email : <b>tim.jennings@example.com </b></span>
               <span>Login Date : <b> 12th Feb 2022 at 09:05 AM </b></span>
             </div>
             <div css={styles.card}>
               <span>Email : <b>willie.jennings@example.com</b></span>
               <span>Logout Date : <b>12th Feb 2022 at 09:05 AM</b></span>
             </div>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ConfirmationCard;

const styles = {
  wrapper: css`
    margin: 12px;
    .accordion-item {
      padding: 0;
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
  `,
  card:css`
   display:flex;
   flex-direction:column;
   padding-bottom:15px;
   padding-top:15px;
   font-size: 15px;
   gap:10px;
   border-bottom:1px solid #E0E0E0;
   b{
    font-weight: 500;
   }
  `
};
