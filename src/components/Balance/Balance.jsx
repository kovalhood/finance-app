import { useState } from "react";
import { ReactComponent as Diagram } from "../../images/icons/Diagram.svg";
import s from "./Balance.module.scss";

export const Balance = () => {
  const [balance, setBalance] = useState("00.00 UAH");
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);

  const handleChange = (e) => {
    setBalance(e.target.value);
    setIsDisabledBtn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setBalance(
      Number(balance)
        .toLocaleString("cs-CZ", {
          style: "currency",
          currency: "UAH",
        })
        .replace(",", ".")
    );
    setIsDisabledBtn(true);
  };

  return (
    <>
      <div className={s.formContainer}>
        <div className={s.reportContainer}>
          <a href="report" className={s.reportLink} type="button">
            Reports
            <Diagram className={s.reportSvg} />
          </a>
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          <label htmlFor="balance" className={s.label}>
            Balance:
          </label>
          <div className={s.btnContainer}>
            <input
              id="#balance"
              className={s.input}
              type="text"
              name="balance"
              value={balance}
              onChange={handleChange}
              minLength="1"
              pattern="^[0-9]+$"
              title="Field may contain only numbers from 0 to 9"
              required
              onFocus={() => setBalance("")}
            />
            <button
              type="submit"
              className={!isDisabledBtn ? s.button : s.buttonDisabled}
              disabled={isDisabledBtn}
            >
              Confirm
            </button>
          </div>
        </form>
        {balance === "00.00 UAH" && (
          <div className={s.popUpContainer}>
            <p className={s.popUpText}>
              Hello! To get started, enter the current balance of your account!
            </p>
            <p className={s.popUpTextBottom}>
              You can't spend money until you have it &#128521;
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Balance;
