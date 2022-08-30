import styles from "./AuthForm.module.css";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { Loader } from "../Loader";
import { useMediaQuery } from "react-responsive";
import { isMobile, isTablet } from "../../utils/mediaQuery";
import { Google } from "../Google";
import { Toast } from "react-bootstrap";

export const AuthForm = () => {
  const initState = {
    email: "",
    password: "",
  };
  const [loaderState, setLoaderState] = useState(false);
  const [initialValues, setInitialValues] = useState(initState);

  const [emailToast, setEmailToast] = useState(true);
  const [passToast, setPassToast] = useState(true);

  const IsMobile = isMobile(useMediaQuery);
  const IsTablet = isTablet(useMediaQuery);

  const toggleShowA = () => setEmailToast(!emailToast);
  const toggleShowB = () => setPassToast(!passToast);

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
    setInitialValues({ email, password });
    console.log("login", email);

    resetAllFields();
  };
  const onRegister = (data, e) => {
    e.preventDefault();
    setLoaderState(true);
    const { email, password } = data;
    console.log("register", initialValues);
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
