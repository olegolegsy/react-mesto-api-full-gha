import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";

const Register = ({ handleRegister }) => {
  const { handleChange, value } = useValidation();

  const onSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(value.password, value.email);
  };
  return (
    <section noValidate className="sign__content">
      <form className="sign__form" onSubmit={onSubmit}>
        <h2 className="sign__header">Регистрация</h2>
        <input
          placeholder="Email"
          className="sign__input"
          type="email"
          name="email"
          value={value.email ? value.email : ""}
          onChange={handleChange}
        />
        <input
          placeholder="Пароль"
          className="sign__input"
          type="password"
          name="password"
          onChange={handleChange}
          value={value.password ? value.password : ""}
        />
        <button className="sign__btn" type="submit">
          Зарегистрироваться
        </button>
        <Link className="sign__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
};

export default Register;
