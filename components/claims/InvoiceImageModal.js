/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState } from "react";
import { css } from "@emotion/react";
import {
  MdOutlineClose,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

const InvoiceImageModal = ({ isOpen = false, close = () => {} }) => {
  const items = [
    {
      src: "/images/invoiceSample.jpg",
      key: 1,
    },
    {
      src: "/images/invoiceSample.jpg",
      key: 2,
    },
    {
      src: "/images/invoiceSample.jpg",
      key: 3,
    },
    {
      src: "/images/invoiceSample.jpg",
      key: 4,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="image">
          <img src={item.src} alt={item.altText} />
        </div>
      </CarouselItem>
    );
  });

  return (
    <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
      <div css={styles.header}>
        <label className="header-text">Attachments</label>
        <label onClick={() => close()} style={{ cursor: "pointer" }}>
          <MdOutlineClose color="#757575" size={20} />
        </label>
      </div>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        css={styles.carouselContainer}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
          className="carouselIndicators"
        />
        {slides}
        <label>
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />

          <MdOutlineKeyboardArrowRight
            className="rightArrow"
            color="var(--white)"
            size={30}
          />
        </label>
        <label>
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
          <MdKeyboardArrowLeft
            color="var(--white)"
            size={30}
            className="leftArrow"
          />
        </label>
      </Carousel>
    </Modal>
  );
};

export default InvoiceImageModal;

const styles = {
  modal: css`
    .modal-content {
      border-radius: 10px;
      margin-top: 7rem;
      width: 100%;
      background: #f5f5f5;
      padding: 10px 20px;
    }
  `,
  carouselContainer: css`
    display: flex;
    padding: 30px 0;
    .carousel-indicators {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      margin 0;
      position: absolute;
      bottom: -30px;
      button {
        width: 6px;
        height: 6px;
        border-radius: 100%;
        padding: 1px;
        background-color: var(--primary);
      }
    }
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      background: var(--primary);
      display: none;
    }
    .leftArrow {
      position: absolute;
      left: 0;
      width: 24px;
      height: 24px;
      border-radius: 50px;
      margin-top: 7rem;
      background: var(--primary);
    }
    .rightArrow {
      position: absolute;
      right: 0;
      width: 24px;
      height: 24px;
      border-radius: 50px;
      margin-top: 7rem;
      background: var(--primary);
    }
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      color: #000;
    }
  `,
  actionButton: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
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
  dateContent: css`
    display: flex;
     justify-content: space-between;
    padding; 10px;
    gap: 3px;
    @media (max-width: 345px) {
        background: red;
        flex-direction: column;
      }
    span {
        display: flex;
    justify-content: center;
      align-items: center;
      margin-top: 30px;
    }
    label {
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      background: var(--white);
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
      padding: 5px 10px;
      gap: 7px;
      width: 100%;
    }
    div {
      color: #37474f;
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
      font-family: Open Sans;
    }
    input {
      border: none;
      background: none;
      width: 95px;
      :focus {
        outline: none;
        border: none;
      }
      ::placeholder {
        color: var(--darker-gray);
        font-size: 13px;
        font-weight: 400;
        line-height: normal;
      }
    }
  `,
};
