import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import { API, PATH_FILE } from "../../config/api";
import { useParams } from "react-router";
import swal from "sweetalert";
import { UserContext } from "../../context/userContext";
import "../../assets/stylesheets/home.css";

function DetailCollection() {
  const [state, dispatch] = useContext(UserContext);
  const [literatur, setLiteratur] = useState([]);

  const { id } = useParams();
  const getLiteratur = async () => {
    try {
      const response = await API.get(`/collection/${id}`);
      setLiteratur(response.data.collection);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCollection = async (item) => {
    try {
      const response = await API.delete(`collection/${item.id}`);
      swal({
        title: response.data.message,
      });
    } catch (error) {
      console.log(error);
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
        {literatur?.map((item, index) => {
          return (
            <div className="row ms-3" item={item} key={index}>
              <div className="col-md-4">
                <embed
                  src={PATH_FILE + item.literatur.attach}
                  style={{ width: 400, height: 550 }}
                  type="application/pdf"
                  frameBorder="0"
                  scrolling="auto"
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="col-md-4 ">
                <h2>{item.literatur.title}</h2>
                <h4 className="text-secondary">{item.literatur.author}</h4>
                <h4 className="mt-5">Publication date</h4>
                <h4 className="text-secondary">
                  {item.literatur.publication_date}
                </h4>
                <h4 className="mt-5">Pages</h4>
                <h4 className="text-secondary">{item.literatur.pages}</h4>
                <h4 className="mt-5 text-danger">ISBN</h4>
                <h4 className="text-secondary">{item.literatur.ISBN}</h4>
                <button
                  className="btn btn-danger mt-5 px-3 text-light"
                  onClick={() => window.open(PATH_FILE + item.literatur.attach)}
                >
                  view
                </button>
              </div>
              <div className="col-md-1" />
              <div className="col-md-3 text-end pe-5">
                <button
                  className="btn btn-danger text-light"
                  onClick={async () => {
                    await API.delete(`/collection/${item.id}`);
                    swal({
                      title: "collection deleted",
                      icon: "warning",
                    });
                    window.location = "/myCollection";
                  }}
                >
                  Remove from Collection
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DetailCollection;
