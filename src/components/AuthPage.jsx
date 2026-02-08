import { useState } from 'react';

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

function AuthPage({ onGoHome, onAuthSuccess, embedded = false, closeLabel = 'На главную' }) {
  const [mode, setMode] = useState('login');
  const isRegister = mode === 'register';
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  const setField = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setNotice('');
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrors({});
    setNotice('');
  };

  const validateRegister = () => {
    const nextErrors = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = 'Имя должно содержать минимум 2 символа.';
    }

    if (!values.email.includes('@')) {
      nextErrors.email = 'Введите корректный email.';
    }

    if (values.password.length < 8) {
      nextErrors.password = 'Пароль должен быть не короче 8 символов.';
    }

    if (values.password !== values.passwordConfirm) {
      nextErrors.passwordConfirm = 'Пароли не совпадают.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (isRegister) {
      if (!validateRegister()) {
        return;
      }

      setNotice('Регистрация прошла успешно. Теперь можно войти.');
      switchMode('login');
      return;
    }

    setNotice('Вход выполнен (демо-режим).');
    if (onAuthSuccess) {
      onAuthSuccess();
    }
  };

  const onForgotPassword = () => {
    setNotice('Ссылка для восстановления отправлена на указанный email (демо).');
  };

  return (
    <main className={`authPage ${embedded ? 'authPageEmbedded' : ''}`}>
      <section className={`authCard ${isRegister ? 'registerMode' : 'loginMode'}`} aria-labelledby="auth-heading">
        <div className={`authTopBar ${embedded ? 'authTopBarEmbedded' : ''}`}>
          <button type="button" className={`authBackLink ${embedded ? 'authCloseButton' : ''}`} onClick={onGoHome}>
            {embedded ? '×' : closeLabel}
          </button>
        </div>

        <h1 id="auth-heading" className="authTitle">
          {isRegister ? 'Регистрация' : 'Авторизация'}
        </h1>
        <p className="authSubtitle">{isRegister ? 'Создайте новый аккаунт' : 'Войдите в свой аккаунт'}</p>

        <div className="authTabs" role="tablist" aria-label="Выбор формы">
          <button
            type="button"
            className={`authTab ${!isRegister ? 'active' : ''}`}
            role="tab"
            aria-selected={!isRegister}
            onClick={() => switchMode('login')}
          >
            Вход
          </button>
          <button
            type="button"
            className={`authTab ${isRegister ? 'active' : ''}`}
            role="tab"
            aria-selected={isRegister}
            onClick={() => switchMode('register')}
          >
            Регистрация
          </button>
        </div>

        <form className="authForm" onSubmit={onSubmit} noValidate>
          <div className={`authExtraFields ${isRegister ? 'visible' : ''}`} aria-hidden={!isRegister}>
            <div className="authExtraInner">
              <label className="authField">
                <span>Имя</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={values.name}
                  onChange={setField}
                  required={isRegister}
                  disabled={!isRegister}
                  className={errors.name ? 'fieldInvalid' : ''}
                />
                {errors.name && <small className="authError">{errors.name}</small>}
              </label>
            </div>
          </div>

          <label className="authField">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={values.email}
              onChange={setField}
              required
              className={errors.email ? 'fieldInvalid' : ''}
            />
            {errors.email && <small className="authError">{errors.email}</small>}
          </label>

          <label className="authField">
            <span>Пароль</span>
            <input
              type="password"
              name="password"
              placeholder="Минимум 8 символов"
              minLength={8}
              value={values.password}
              onChange={setField}
              required
              className={errors.password ? 'fieldInvalid' : ''}
            />
            {errors.password && <small className="authError">{errors.password}</small>}
          </label>

          {!isRegister && (
            <button type="button" className="forgotPasswordBtn" onClick={onForgotPassword}>
              Забыли пароль?
            </button>
          )}

          <div className={`authExtraFields ${isRegister ? 'visible' : ''}`} aria-hidden={!isRegister}>
            <div className="authExtraInner">
              <label className="authField">
                <span>Подтвердите пароль</span>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Повторите пароль"
                  minLength={8}
                  value={values.passwordConfirm}
                  onChange={setField}
                  required={isRegister}
                  disabled={!isRegister}
                  className={errors.passwordConfirm ? 'fieldInvalid' : ''}
                />
                {errors.passwordConfirm && <small className="authError">{errors.passwordConfirm}</small>}
              </label>
            </div>
          </div>

          {notice && <p className="authNotice">{notice}</p>}

          <button type="submit" className="authSubmit">
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthPage;
