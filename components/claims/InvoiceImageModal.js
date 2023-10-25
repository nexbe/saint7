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

const InvoiceImageModal = ({
  isOpen = false,
  close = () => {},
  attachment,
}) => {
  const items = attachment?.map((eachAttach, index) => {
    return {
      src: eachAttach?.url,
      key: index + 1,
    };
  });

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
        key={item?.key}
      >
        <div className="image">
          <img
            src={`${process.env.NEXT_PUBLIC_APP_URL}${item?.src}`}
            alt={item.altText}
          />
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
      img {
      width: 100%;
      height: 350px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      }
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
};
