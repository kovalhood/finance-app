import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import styles from "./Form.module.scss";
import sprite from "../../../images/sprite.svg";

const materialTheme = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#FF751D",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },

    // Hover color for icon
    MuiInput: {
      root: {
        "&:hover svg": {
          fill: "#FF751D",
        },
      },
    },
    MuiPickersDay: {
      day: {
        color: "#f88a46",
      },
      daySelected: {
        backgroundColor: "#FF751D",
      },
      dayDisabled: {
        color: "#C7CCDC",
      },
      current: {
        color: "#FF751D",
      },
    },
    MuiButton: {
      textPrimary: {
        color: "#FF751D",
      },
    },
    MuiTypography: {
      colorPrimary: {
        color: "#FF751D",
      },
    },
    MuiInputBase: {
      input: {
        cursor: "pointer",
      },
    },
  },
});

const Form = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedDay, setSelectedDay] = useState('');
  // const [selectedMonth, setSelectedMonth] = useState('');
  // const [selectedYear, setSelectedYear] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  function handleQueryChange() {
    // const dayQuery = new Date(selectedDate).getDate();
    const monthQuery = new Date(selectedDate).getMonth() + 1;
    const yearQuery = new Date(selectedDate).getFullYear();

    navigate(`${location.pathname}?month=${monthQuery}&year=${yearQuery}`);
  }

  useEffect(() => {
    handleQueryChange();
  }, [selectedDate]);

  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            disableFuture
            format="dd.MM.yyyy"
            InputProps={{
              disableUnderline: true,
              style: {
                width: 100,
                fontSize: 12,
                fontWeight: 900,
                color: "#52555F",
                cursor: "pointer",
              },
              startAdornment: (
                <InputAdornment position={"start"}>
                  <Icon>
                    <svg
                      className={styles.calendar__icon}
                      width="20"
                      height="20"
                    >
                      <use href={`${sprite}#calendar`}></use>
                    </svg>
                  </Icon>
                </InputAdornment>
              ),
            }}
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  );
};

export default Form;
