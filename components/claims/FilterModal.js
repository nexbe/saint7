/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useMemo, useState } from "react";
import { css } from "@emotion/react";

const FilterModal = ({
  isOpen = false,
  close = () => {},
  handleCategoryChange = () => {},
}) => {
  const [check, setCheck] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  let categoryOptions = [
    {
      id: 1,
      name: "Advanced Tax",
    },
    {
      id: 2,
      name: "Air Travel Expense",
    },
    {
      id: 3,
      name: "Automobile Expense",
    },
    {
      id: 4,
      name: "Employee Advance",
    },
    {
      id: 5,
      name: "Fuel/Mileage Expense",
    },
    {
      id: 6,
      name: "Furniture and Equipment",
    },
    {
      id: 7,
      name: "IT and Internet Expense",
    },
    {
      id: 8,
      name: "Lodging",
    },
    {
      id: 9,
      name: " Meals and Entertainment",
    },
    {
      id: 10,
      name: "Office Supplies",
    },
    {
      id: 11,
      name: "Air Travel Expense",
    },
    {
      id: 12,
      name: "Telephone Expense",
    },
    {
      id: 13,
      name: "Parking",
    },
  ];

  useMemo(() => {
    setCheck(
      categoryOptions?.map((eachData) => {
        return false;
      })
    );
  }, []);

  const toggleCheck = (id) => {
    let open = check;
    open[id] = !check[id];
    setCheck([...open]);
  };

  const handleMinAmountChange = (event) => {
    const min = event.target.value;
    setMinAmount(min);
  };

  const handleMaxAmountChange = (event) => {
    const max = event.target.value;
    setMaxAmount(max);
  };

  const groupedCategories = [];
  for (let i = 0; i < categoryOptions.length; i += 3) {
    groupedCategories.push(categoryOptions.slice(i, i + 3));
  }

  return (
    <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
      <div css={styles.amountContent}>
        <label>
          <input
            type={"number"}
            placeholder="Minimum"
            value={minAmount}
            onChange={handleMinAmountChange}
          />
        </label>
        <span></span>
        <label>
          <input
            type={"number"}
            placeholder="Maximum"
            value={maxAmount}
            onChange={handleMaxAmountChange}
          />
        </label>
      </div>
      <div css={styles.categoryContent}>
        <label style={{ color: "#4D4D4D" }}>Category</label>
        <div className="category-container">
          {groupedCategories.map((group, index) => (
            <div key={index} className="category-group">
              {group.map((category) => (
                <div className="categoryValue" key={category.id}>
                  <label
                    onClick={() => toggleCheck(category.id)}
                    style={{
                      border: check[category.id]
                        ? "2px solid var(--primary)"
                        : "",
                      color: check[category.id] ? "var(--primary)" : "",
                      fontWeight: check[category.id] ? "700" : "",
                    }}
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div css={styles.actionButton}>
          <button css={styles.cancelBtn} onClick={() => close()}>
            Cancel
          </button>
          <button
            css={styles.addBtn}
            onClick={() => {
              handleCategoryChange(
                minAmount,
                maxAmount,
                categoryOptions,
                check
              );
              close();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;

const styles = {
  modal: css`
    .modal-content {
      border-radius: 16px;
      margin-top: 12rem;
      width: 100%;
      background: var(--white);
      padding: 10px;
    }
  `,
  amountContent: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 50px;
    span {
      border-bottom: 1px solid var(--darker-gray);
      width: 20px;
      position: relative;
      top: -12px;
    }
    label {
      border-bottom: 1px solid var(--darker-gray);
      width: 65px;
      color: var(--darker-gray);
    }
    input {
      border: none;
      background: none;
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
  categoryContent: css`
    .category-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .category-group {
      display: flex;
      gap: 7px;
    }
    .categoryValue {
      label {
        cursor: pointer;
        border: 1px solid var(--darker-gray);
        padding: 2px 10px;
        font-size: 12px;
        font-weight: 400;
        line-height: normal;
        color: var(--darker-gray);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 105px;
        height: 40px;
      }
    }
  `,
  actionButton: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
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
};
