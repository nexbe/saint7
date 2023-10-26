/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import EditPencil from "../../public/icons/editPencil";
import { Input } from "reactstrap";
import { useRouter } from "next/router";

const Card = ({ isEdit, isDelete, isChecked, handleSelect, data }) => {
  const router = useRouter();
  return (
    <div css={styles.wrapper}>
      {isDelete && (
        <div style={{ marginTop: "-9px" }}>
          <Input
            type="checkbox"
            id="status"
            name="status"
            checked={isChecked}
            onChange={handleSelect}
            style={{ border: "2px solid #000", margin:'9px' }}
          />
        </div>
      )}
      <span style={{textAlign:"start"}}>{data?.attributes.title}</span>
      {isEdit && (
        <div
          onClick={() => router.push(`/checklist/editCheckList`)}
          style={{ margin:'auto' }}>
          <EditPencil />
        </div>
      )}
    </div>
  );
};

export default Card;

const styles = {
  wrapper: css`
    border-radius: 4px;
    background: #fff;
    padding: 20px;
    color: var(--primary-font);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: row;
    align-items:center;
  `,
};
