import { useState } from "react";
import { Link } from "react-router-dom";
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
            Перейти до звітів
            <Diagram className={s.reportSvg} />
          </a>
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          <label htmlFor="balance" className={s.label}>
            Баланс:
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
              Підтвердити
            </button>
          </div>
        </form>
        {balance === "00.00 UAH" && (
          <div className={s.popUpContainer}>
            <p className={s.popUpText}>
              Привіт! Для початку роботи внеси поточний баланс рахунку!
            </p>
            <p className={s.popUpTextBottom}>
              Ти не можешь витрачати грошу, поки їх у тебе немає!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Balance;
