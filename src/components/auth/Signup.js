import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import "../../assets/stylesheets/home.css";

function Signup() {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const { email, password, fullname, phone, address } = form;

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

      const response = await API.post("/register", body, config);
      console.log(response);
      // Checking process
      if (response?.status === 200) {
        // Send data to useContext

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }

      swal({
        title: "Successfully registered!",
        icon: "success",
        button: "ok",
      });
      // Status check
      if (response.data.data.status === "admin") {
        window.location = "/admin/literaturs";
      } else {
        window.location = "/home";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <button
        type="button"
        class="btn btn-danger px-5 me-5"
        data-bs-toggle="modal"
        data-bs-target="#ModalSignup"
      >
        Sign Up
      </button>

      <div
        class="modal fade"
        id="ModalSignup"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-light">
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="modal-header">
                  <h3>Sign Up</h3>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="row text-center mt-3 mx-2">
                  <div className="col text-light">
                    <input
                      class="form-control bg-secondary "
                      type="text"
                      value={fullname}
                      name="fullname"
                      onChange={onChange}
                      placeholder="fullname"
                      required
                    />
                    <input
                      class="form-control bg-secondary mt-3"
                      type="email"
                      value={email}
                      name="email"
                      onChange={onChange}
                      placeholder="email"
                      required
                    />
                    <input
                      class="form-control bg-secondary mt-3"
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="password"
                      required
                    />
                    <input
                      class="form-control bg-secondary mt-3"
                      type="number"
                      value={phone}
                      name="phone"
                      onChange={onChange}
                      maxLength="13"
                      required
                      placeholder="number"
                    />
                    <input
                      class="form-control bg-secondary mt-3"
                      type="text"
                      value={address}
                      name="address"
                      onChange={onChange}
                      required
                      placeholder="address"
                    />
                  </div>
                </div>
                <div className="text-center my-3">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{ width: 430 }}
                  >
                    Sign Up
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

export default Signup;
