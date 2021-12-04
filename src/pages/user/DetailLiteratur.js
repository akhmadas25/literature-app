import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import { API, PATH_FILE } from "../../config/api";
import { useParams } from "react-router";
import swal from "sweetalert";
import { UserContext } from "../../context/userContext";
import "../../assets/stylesheets/home.css";

function DetailLiteratur() {
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    attach: "",
    title: "",
    author: "",
    ISBN: "",
    publication_date: "",
    pages: "",
  });
  const [literatur, setLiteratur] = useState([]);

  const { id } = useParams();
  const getLiteratur = async () => {
    try {
      const response = await API.get(`/literatur/${id}`);
      setLiteratur(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCollection = async () => {
    try {
      const data = { literaturId: id };

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(data);
      const response = await API.post("/addCollection", body, config);
      swal({
        title: response.data.message,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "you already have this collection",
        icon: "warning",
      });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const editLiteratur = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.attach) {
        formData.set("attach", form?.attach[0], form?.attach[0]?.name);
      }
      formData.set("pages", form.pages);
      formData.set("ISBN", form.ISBN);
      formData.set("author", form.author);
      formData.set("title", form.title);
      formData.set("publication_date", form.publication_date);
      const response = await API.post(`/literatur/${id}`, formData, config);
      swal({
        title: response.data.message,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "server error",
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    getLiteratur();
  }, []);

  return (
    <div className="container-fluid main bg-dark text-light">
      <div className="ms-3 me-3">
        <Navbar />
      </div>
      <div className="header ms-3 my-3 ">
        {literatur?.map((item, index) => (
          <>
            <div className="row ms-3" item={item} key={index}>
              <div className="col-md-4">
                <embed
                  src={PATH_FILE + item.attach}
                  style={{ width: 400, height: 550 }}
                  type="application/pdf"
                  frameBorder="0"
                  scrolling="auto"
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="col-md-4 ">
                <h2 className="title">{item.title}</h2>
                <h4 className="text-secondary">{item.author}</h4>
                <h4 className="mt-5">Publication date</h4>
                <h4 className="text-secondary">{item.publication_date}</h4>
                <h4 className="mt-5">Pages</h4>
                <h4 className="text-secondary">{item.pages}</h4>
                <h4 className="mt-5 text-danger">ISBN</h4>
                <h4 className="text-secondary">{item.ISBN}</h4>
                <button
                  className="btn btn-danger mt-5 px-3 text-light"
                  onClick={() => window.open(PATH_FILE + item.attach)}
                >
                  view
                </button>
              </div>
              <div className="col-md-1" />
              <div className="col-md-3 text-end pe-5">
                {item.userId === state.user.id ? (
                  <>
                    {/* <button
                      type="button"
                      class="btn btn-danger px-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      edit
                    </button> */}
                  </>
                ) : (
                  <button
                    className="btn btn-danger text-light"
                    onClick={addCollection}
                  >
                    Add My Collection
                  </button>
                )}
              </div>
            </div>
            {/* <div className="modal fade" id="modalEdit" tabindex="-1">
              <div class="modal-dialog">
                <div class="modal-content bg-dark">
                  <form onSubmit={editLiteratur}>
                    <div class="modal-header">
                      <h5 class="modal-title">Edit Literatur</h5>
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
                        value={item.author}
                        type="text"
                        name="author"
                        onChange={handleChange}
                      />
                      <input
                        className="form-control bg-secondary mt-3"
                        value={item.title}
                        type="text"
                        name="title"
                        onChange={handleChange}
                      />
                      <input
                        className="form-control bg-secondary mt-3"
                        value={item.pages}
                        type="number"
                        name="pages"
                        onChange={handleChange}
                      />
                      <input
                        className="form-control bg-secondary mt-3"
                        value={item.publication_date}
                        type="date"
                        name="publication_date"
                        onChange={handleChange}
                      />
                      <input
                        className="form-control bg-secondary mt-3"
                        value={item.ISBN}
                        type="number"
                        name="ISBN"
                        onChange={handleChange}
                      />
                      <label className="mt-5 ">
                        <a className="btn btn-danger text-light">
                          upload new file
                        </a>

                        <input
                          type="file"
                          className="form-control bg-secondary mt-3"
                          value={item.attach}
                          onChange={handleChange}
                          name="attach"
                          hidden
                        />
                      </label>
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
            </div> */}
          </>
        ))}
      </div>
    </div>
  );
}

export default DetailLiteratur;
