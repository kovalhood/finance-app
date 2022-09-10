import styles from './AuthForm.module.css';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/operation';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Loader } from '../Loader';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isTablet } from '../../utils/mediaQuery';
import { Google } from '../Google';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    email: '',
    password: '',
  };
  const [loaderState, setLoaderState] = useState(false);
  const [initialValues, setInitialValues] = useState(initState);
  const [logEmail, setLogEmail] = useState('');
  const [logPass, setLogPass] = useState('');

  const IsMobile = isMobile(useMediaQuery);
  const IsTablet = isTablet(useMediaQuery);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Дане поле є обовязковим')
      .email(
        'Невірно введена електронна адреса. Перевірте коректність написання електронної адреси'
      ),
    password: Yup.string()
      .required('Дане поле є обовязковим')
      .min(6, 'Пароль має бути не менше 6 символів')
      .max(20, 'Пароль не повинен перевищувати 20 символів')
      .minLowercase(2, 'Пароль повинен містити принаймні 2 малі літери')
      .minUppercase(2, 'Пароль повинен містити принаймні 2 великі літери')
      .minNumbers(3, 'Пароль повинен містити не менше 3 цифр')
      .minSymbols(1, 'Пароль повинен містити не менше 1 спеціального символу'),
  });

  const onLogin = (data, e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    setLoaderState(true);
    const { email, password } = data;
    dispatch(authOperations.logIn({ email, password }))
      .then(response => {
        setLoaderState(false);
        resetAllFields();
        navigate('/expense');
      })
      .catch(() => {
        setLoaderState(false);
        console.log('wrong pass or login::');
      });
  };

  const onRegister = (data, e) => {
    e.preventDefault();
    setLoaderState(true);
    const { email, password } = data;
    setLogEmail(email);
    setLogPass(password);

    dispatch(authOperations.register({ email, password }))
      .then(res => {
        const { payload } = res;
        const { user } = payload;

        if (user.email === email) {
          dispatch(authOperations.logIn({ email, password }))
            .then(response => {
              setLoaderState(false);
              resetAllFields();
              navigate('/expense');
            })
            .catch(() => {
              setLoaderState(false);
              console.log('wrong pass or login::');
            });
        }
      })
      .catch(() => {
        setLoaderState(false);
        Notify.failure(`User already register/ Try another login`);
        console.log('wong pass or email::');
      });

    resetAllFields();
  };

  const onError = error => {
    error.email && Notify.failure(`${errors.email.message}`);
    error.password && Notify.failure(`${errors.password.message}`);
  };
  const resetAllFields = () => {
    resetField('email');
    resetField('password');
  };
  const {
    register,
    resetField,
    handleSubmit,
    handleClick,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
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
        onSubmit={handleSubmit(onRegister, onError)}
      >
        <Google />

        <Form.Group className={styles.emailGroup} controlId="formBasicEmail">
          <Form.Label className={styles.label}>Електронна пошта:</Form.Label>
          <Form.Control
            className={IsMobile ? styles.mobInput : styles.input}
            type="email"
            placeholder="Enter email"
            {...register('email')}
          />

          {errors.email && errors.email.type === 'required' && (
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
            {...register('password')}
          />
          {errors.password && errors.password.type === 'required' && (
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
            type="button"
            onClick={handleSubmit(onLogin, onError)}
          >
            Увійти
          </Button>
          <Button
            className={styles.registerButton}
            variant="primary"
            type="submit"
          >
            Реєстрація
          </Button>
        </div>
      </Form>
    </>
  );
};
