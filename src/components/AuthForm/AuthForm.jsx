import styles from "./AuthForm.module.css";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authOperations } from "../../redux/auth";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { Loader } from "../Loader";
import { useMediaQuery } from "react-responsive";
import { isMobile, isTablet } from "../../utils/mediaQuery";
import { Google } from "../Google";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    email: "",
    password: "",
  };
  const [loaderState, setLoaderState] = useState(false);
  const [initialValues, setInitialValues] = useState(initState);

  const IsMobile = isMobile(useMediaQuery);
  const IsTablet = isTablet(useMediaQuery);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Дане поле є обовязковим")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Дане поле є обовязковим")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoaderState(true);
    const { email, password } = data;
    dispatch(authOperations.logIn({ email, password }))
      .then((response) => {
        setLoaderState(false);
        resetAllFields();
        navigate("/dashboard");
      })
      .catch(() => {
        setLoaderState(false);
        console.log("wrong pass or login::");
      });
  };
  const onRegister = (data, e) => {
    e.preventDefault();
    setLoaderState(true);
    const { email, password } = data;
    dispatch(authOperations.register({ email, password }))
      .then((response) => {
        setLoaderState(false);
        resetAllFields();
        navigate("/dashboard");
      })
      .catch(() => {
        setLoaderState(false);
        Notify.failure(`User already register/ Try another login`);
        console.log("wong pass or email::");
      });

    resetAllFields();
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };
  const resetAllFields = () => {
    resetField("email");
    resetField("password");
  };
  const {
    register,
    resetField,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  return (
    <>
      {loaderState && <Loader />}
      <Form
        className={
          IsMobile
            ? styles.formAuthMobile
            : IsTablet
            ? styles.formAuthTablet
            : styles.formAuthDesktop
        }
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Google />

        <Form.Group className={styles.emailGroup} controlId="formBasicEmail">
          <Form.Label className={styles.label}>Електронна пошта:</Form.Label>
          <Form.Control
            className={IsMobile ? styles.mobInput : styles.input}
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />

          {errors.email && errors.email.type === "required" && (
            <Form.Text className={styles.tooltip}>
              <span className={styles.dotTooltip}>*</span>
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className={styles.passGroup} controlId="formBasicPassword">
          <Form.Label className={styles.label}>Пароль:</Form.Label>
          <Form.Control
            className={IsMobile ? styles.mobInput : styles.input}
            autoComplete="off"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && errors.password.type === "required" && (
            <Form.Text className={styles.tooltip}>
              <span className={styles.dotTooltip}>*</span>
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
        <div className={styles.controlBar}>
          <Button
            className={styles.loginButton}
            variant="primary"
            type="submit"
          >
            Увійти
          </Button>
          <Button
            className={styles.registerButton}
            variant="primary"
            type="button"
            onClick={handleSubmit(onRegister)}
          >
            Реєстрація
          </Button>
        </div>
      </Form>
    </>
  );
};
