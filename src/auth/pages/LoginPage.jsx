import { useEffect } from "react";
import "../../Css/LoginPage.css";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const onLoginSubmit = (event) => {
    event.preventDefault();

    startLogin({
      email: loginEmail,
      password: loginPassword,
    });
  };

  const onRegisterSubmit = (event) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire("Registration failed", "passwords are not the same", "error");

      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Authentication error", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
               <h2>Calendar App</h2>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3 ">WELCOME BACK !!!</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-style"
                            placeholder="Your Email"
                            name="loginEmail"
                            value={loginEmail}
                            onChange={onLoginInputChange}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            className="form-style"
                            placeholder="Your Password"
                            name="loginPassword"
                            value={loginPassword}
                            onChange={onLoginInputChange}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button onClick={onLoginSubmit} className="btn mt-4">
                          submit
                        </button>
                        <p className="mb-0 mt-4 text-center"></p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center mt-2">
                    
                        <h4 className="mb-4 pb-3">CREATE YOUR ACCOUNT !!</h4>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-style"
                            placeholder="Your Full Name"
                            name="registerName"
                            value={registerName}
                            onChange={onRegisterInputChange}
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            className="form-style"
                            placeholder="Your Email"
                            name="registerEmail"
                            value={registerEmail}
                            onChange={onRegisterInputChange}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            className="form-style"
                            placeholder="Your Password"
                            name="registerPassword"
                            value={registerPassword}
                            onChange={onRegisterInputChange}
                          />
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Repeat your Password"
                              name="registerPassword2"
                              value={registerPassword2}
                              onChange={onRegisterInputChange}
                            />
                          </div>
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a onClick={onRegisterSubmit} className="btn mt-4">
                          submit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    /* 
          <div className="container login-container">
              <div className="row">
                  <div className="col-md-6 login-form-1">
                      <h3>Ingreso</h3>
                      <form onSubmit={onLoginSubmit}>
                          <div className="form-group mb-2">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Correo"
                                  name='loginEmail'
                                  value={loginEmail}
                                  onChange={onLoginInputChange}
                              />
                          </div>
                          <div className="form-group mb-2">
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Contraseña"
                                  name='loginPassword'
                                  value={loginPassword}
                                  onChange={onLoginInputChange}
                              />
                          </div>
                          <div className="d-grid gap-2">
                              <input
                                  type="submit"
                                  className="btnSubmit"
                                  value="Login"
                              />
                          </div>
                      </form>
                  </div>
                 <div className="col-md-6 login-form-2">
                      <h3>Registro</h3>
                      <form onSubmit={onRegisterSubmit}>
                          <div className="form-group mb-2">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Nombre"
                                  name='registerName'
                                  value={registerName}
                                  onChange={onRegisterInputChange}
                              />
                          </div>
                          <div className="form-group mb-2">
                              <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Correo"
                                  name='registerEmail'
                                  value={registerEmail}
                                  onChange={onRegisterInputChange}
                              />
                          </div>
                          <div className="form-group mb-2">
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Contraseña"
                                  name='registerPassword'
                                  value={registerPassword}
                                  onChange={onRegisterInputChange}
                              />
                          </div>
                         <div className="form-group mb-2">
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Repita la contraseña"
                                  name='registerPassword2'
                                  value={registerPassword2}
                                  onChange={onRegisterInputChange}
                              />
                          </div>
                         <div className="d-grid gap-2">
                              <input
                                  type="submit"
                                  className="btnSubmit"
                                  value="Crear cuenta" />
                          </div>
                      </form>
                  </div>
              </div>
          </div> */
  );
};
