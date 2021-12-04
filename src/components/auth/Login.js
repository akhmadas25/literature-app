import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import swal from "sweetalert";

function Login() {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      console.log(body);

      // Insert data for login process
      const response = await API.post("/login", body, config);
      console.log(response);
      // Checking process
      if (response?.status === 200) {
        // Send data to useContext

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }

      // Status check
      if (response.data.data.status === "admin") {
        dispatch({
          type: "ADMIN_SUCCESS",
          payload: response.data.data,
        });
        window.location = "/admin/literaturs";
      } else {
        window.location = "/home";
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "incorrect",
        text: "email or password doesn't match",
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <button
        type="button"
        class="btn btn-light px-5"
        data-bs-toggle="modal"
        data-bs-target="#ModalLogin"
      >
        Sign In
      </button>

      <div class="modal fade" id="ModalLogin" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-light">
            <div class="modal-body">
              <div class="modal-header">
                <h3>Sign In</h3>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row text-center mt-3 mx-2">
                  <div className="col">
                    <input
                      class="form-control bg-secondary"
                      type="email"
                      value={email}
                      name="email"
                      onChange={onChange}
                      placeholder="email"
                    />
                    <input
                      class="form-control bg-secondary mt-3"
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="password"
                    />
                  </div>
                </div>
                <div className="text-center my-3">
                  <button
                    type="button"
                    type="submit"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    class="btn btn-danger px-5"
                    style={{ width: 430 }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
