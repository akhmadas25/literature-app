import React, { useState, useEffect } from "react";
import mail from "../assets/icon/mail.png";
import phone from "../assets/icon/phone.png";
import gender from "../assets/icon/gender.png";
import location from "../assets/icon/location.png";
import "../assets/stylesheets/home.css";
import { API, PATH_FILE } from "../config/api";
import swal from "sweetalert";

function CardProfile() {
  const [profile, setProfile] = useState([]);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    address: "",
    picture: "",
  });

  const getProfile = async () => {
    try {
      const response = await API.get("/profile");
      setProfile(response.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // preview profile picture
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.picture) {
        formData.set("picture", form?.picture[0], form?.picture[0]?.name);
      }
      formData.set("address", form.address);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      const response = await API.post("/changeProfile", formData, config);
      getProfile();
      swal({
        title: response.data.message,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "server error",
        icon: "danger",
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {profile?.map((item, index) => (
        <>
          <div item={item} key={index} className="card profile py-3 my-3">
            <div className="row mt-3">
              <div className="col-md-5 ms-3 me-5 mt-2 text-start">
                <div className="row">
                  <div className="col-md-2 text-end">
                    <img src={mail} alt={mail} style={{ marginTop: 15 }} />
                  </div>
                  <div className="col">
                    <p>{item.email}</p>
                    <p className="text-secondary" style={{ marginTop: -18 }}>
                      mail
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 text-end">
                    <img src={gender} alt={gender} style={{ marginTop: 15 }} />
                  </div>
                  <div className="col">
                    <p>male</p>
                    <p className="text-secondary" style={{ marginTop: -18 }}>
                      gender
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 text-end">
                    <img src={phone} alt={phone} style={{ marginTop: 15 }} />
                  </div>
                  <div className="col">
                    <p>{item.phone}</p>
                    <p className="text-secondary" style={{ marginTop: -18 }}>
                      phone
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 text-end">
                    <img
                      src={location}
                      alt={location}
                      style={{ marginTop: 15 }}
                    />
                  </div>
                  <div className="col my-0">
                    <p>{item.address}</p>
                    <p className="text-secondary" style={{ marginTop: -18 }}>
                      address
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4" />
              <div className="col-md-2 text-end">
                <div className="row mt-3">
                  <img src={PATH_FILE + item.picture} alt="picture" />
                  <button
                    className="btn btn-danger mt-3"
                    data-bs-toggle="modal"
                    data-bs-target="#modalChange"
                  >
                    change profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* modal */}
          <div class="modal fade" id="modalChange" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content bg-dark">
                <form onSubmit={handleSubmit}>
                  <div class="modal-header">
                    <h5 class="modal-title">Change Profile</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <input
                      className="form-control bg-secondary mt-3"
                      value={item.email}
                      type="text"
                      name="email"
                      onChange={handleChange}
                    />

                    <input
                      className="form-control bg-secondary mt-3"
                      value={item.phone}
                      type="text"
                      name="phone"
                      onChange={handleChange}
                    />
                    <input
                      className="form-control bg-secondary mt-3"
                      value={item.address}
                      type="text"
                      name="address"
                      onChange={handleChange}
                    />
                    <label className="mt-5 ">
                      <a className="btn btn-danger text-light">
                        upload profile picture
                      </a>
                      <input
                        type="file"
                        name="picture"
                        hidden
                        onChange={handleChange}
                      />
                    </label>
                    {preview ? (
                      <div className="preview text-center mt-5">
                        <img
                          src={preview}
                          alt="picture"
                          style={{ height: "25vh" }}
                        />
                      </div>
                    ) : (
                      <div className="preview text-center mt-5">
                        <img
                          src={PATH_FILE + item.picture}
                          alt="picture"
                          style={{ height: "25vh" }}
                        />
                      </div>
                    )}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default CardProfile;
