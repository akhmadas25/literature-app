import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../assets/stylesheets/home.css";
import { API } from "../../config/api";
import swal from "sweetalert";

function AddLiteratur() {
  const [form, setForm] = useState({
    title: "",
    publication_date: "",
    pages: "",
    ISBN: "",
    author: "",
    attach: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
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
      if (form.attach) {
        formData.set("attach", form?.attach[0], form?.attach[0]?.name);
      }
      formData.set("title", form.title);
      formData.set("pages", form.pages);
      formData.set("ISBN", form.ISBN);
      formData.set("publication_date", form.publication_date);
      formData.set("author", form.author);

      const response = await API.post("/addLiteratur", formData, config);
      console.log(response);

      swal({
        title: "add literatur success",
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
  useEffect(() => {}, []);

  return (
    <div className="container-fluid main bg-dark text-light">
      <div className="mx-3">
        <Navbar />
        <form onSubmit={handleSubmit}>
          <div className="header ms-3 my-3 ">
            <h1>Add Literatur</h1>
            <input
              className="form-control bg-secondary mt-3"
              placeholder="title"
              type="text"
              name="title"
              onChange={handleChange}
            />
            <input
              className="form-control bg-secondary mt-3"
              placeholder="Publication Date"
              type="date"
              name="publication_date"
              onChange={handleChange}
            />
            <input
              className="form-control bg-secondary mt-3"
              placeholder="Pages"
              type="text"
              name="pages"
              onChange={handleChange}
            />
            <input
              className="form-control bg-secondary mt-3"
              placeholder="ISBN"
              type="text"
              name="ISBN"
              onChange={handleChange}
            />
            <input
              className="form-control bg-secondary mt-3"
              placeholder="Author"
              type="text"
              name="author"
              onChange={handleChange}
            />
            <div className="col-md-3">
              <input
                className="form-control bg-secondary mt-3"
                type="file"
                name="attach"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="text-end mt-5">
            <button className="btn btn-danger text-light px-5" type="submit">
              Add Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLiteratur;
