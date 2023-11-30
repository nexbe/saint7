/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import ClickBoardText from "../../public/icons/clickboardText";
import historyStore from "../../store/history";
import useAuth from "../../store/auth";
import dayjs from "dayjs";

const ConfirmationCard = () => {
  const [open, setOpen] = useState("");
  const [allHistory, setAllHistory] = useState([]);
  const { getAllUsersHistory } = historyStore();
  const { user } = useAuth();

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  const formatDateString = (dateString) => {
    const day = dayjs(dateString).format('DD');
    const date = dayjs(dateString, { timeZone: 'UTC' }).format('MMM YYYY');
    const time = dayjs(dateString).format('hh:mm A'); 
    return `${day}${getOrdinalSuffix(day)} ${date} at ${time}`;
    
  }

  const get30DaysPeriod = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); 
    startDate.setHours(0, 0, 0, 0); 
  
    const endDate = currentDate;
  
    return {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
  };
  

  useEffect(() => {
    const fetchData = async () => {
      if (user.jwt) {
        const { start, end } = get30DaysPeriod();
        try {
          const historyData = await getAllUsersHistory(user.jwt);
          setAllHistory(historyData);
        } catch (error) {
          console.error("Error fetching history:", error);
        }
      }
    };

    fetchData();
  }, [user.jwt]);

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
            {allHistory?.map((history) => {
              return (
                <div css={styles.card} key={history.id}>
                  {console.log(history?.attributes?.logoutAt)}
                  <span>
                    Email :{" "}
                    <b>{history?.attributes?.user?.data?.attributes?.email}</b>
                  </span>
                  {history?.attributes?.loginAt && (
                    <span>
                      Login Date : <b> {formatDateString(history?.attributes?.loginAt)} </b>
                    </span>
                  )}
                  {history?.attributes?.logoutAt && (
                    <span>
                      Logout Date : <b> {formatDateString(history?.attributes?.logoutAt)} </b>
                    </span>
                  )}
                </div>
              );
            })}
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
  card: css`
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    padding-top: 15px;
    font-size: 15px;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
    b {
      font-weight: 500;
    }
  `,
};
