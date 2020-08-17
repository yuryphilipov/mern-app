import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const auth = useContext(AuthContext);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Данные для авторизации</span>
            <div className="input-field">
              <input
                id="email"
                type="text"
                name="email"
                value={form.email}
                className="white-text"
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                className="white-text"
                onChange={changeHandler}
              />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>
          <div className="card-action">
            <div className="row">
              <div className="col s6">
                <button
                  className="btn blue darken-1"
                  onClick={loginHandler}
                  disabled={loading}
                >
                  Войти
                </button>
              </div>
              <div className="col s6">
                <button
                  className="btn gray darken-1 right"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Регистрация
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
