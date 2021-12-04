import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import logo from "../../assets/image/icon.png";
import searchButton from "../../assets/icon/search.png";
import "../../assets/stylesheets/home.css";
import { API } from "../../config/api";
import SearchPage from "../../components/SearchPage";

function Home() {
  const [literaturs, setLiteraturs] = useState([]);
  const [result, setResult] = useState([]);
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        title: title,
        year: year,
      };
      const body = JSON.stringify(data);

      const response = await API.post("/literaturs/search", body, config);
      console.log(response);
      setLiteraturs(response.data.literaturs);
      setResult(response.data.literaturs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleYear = async (e) => {
    e.preventDefault();
    setYear(e.target.value);
    const data = {
      title: title,
      year: year,
    };
    const body = JSON.stringify(data);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await API.post("/literaturs/search", body, config);
    console.log(response);
    setLiteraturs(response.data.literaturs);
  };

  const getLiteraturs = async () => {
    const data = {
      title: "",
      year: "",
    };
    const body = JSON.stringify(data);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await API.post("/literaturs/search", body, config);

    setLiteraturs(response.data.literaturs);
  };

  useEffect(() => {
    getLiteraturs();
  }, []);

  return (
    <div className="container-fluid main bg-dark text-light">
      <div className="ms-3 me-3">
        <Navbar />
        {result.length < 1 ? (
          <>
            <div className="container header text-center">
              <img src={logo} alt={logo} style={{ height: 100 }} />
              <form onSubmit={handleSubmit}>
                <div class="row justify-content-center">
                  <div class="col-md-5 pe-0">
                    <input
                      type="text"
                      className="form-control bg-secondary"
                      placeholder="search for literation"
                      name="title"
                      onChange={handleChangeTitle}
                    />
                  </div>
                  <div className="col-md-1 ps-0">
                    <button
                      type="submit"
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <img
                        src={searchButton}
                        alt="search-button"
                        style={{ height: 40 }}
                      />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleYear}>
              <div className="header my-3 ms-3 ">
                <div className="row">
                  <div className="col-md-4 mt-3">
                    <input
                      className="form-control bg-secondary "
                      name="title"
                      value={title}
                      type="text"
                      onChange={handleChangeTitle}
                    />
                  </div>
                  <div className="col-md-1 mt-3">
                    <button
                      type="submit"
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <img
                        src={searchButton}
                        alt="search-button"
                        style={{ height: 40 }}
                      />
                    </button>
                  </div>
                </div>
                <div className="row  my-5">
                  <div className="col-md-2 me-5">
                    <h5 className="text-danger ms-3">Anytime</h5>

                    <select
                      class="form-select bg-secondary "
                      aria-label="Default select example"
                      name="year"
                      onChange={handleChangeYear}
                    >
                      <option value="">All</option>
                      <option value="2021">Since 2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                    </select>
                  </div>

                  <div className="col-md-9 ms-3">
                    <div className="row">
                      {literaturs.length < 1 ? (
                        <h4 className="mt-3">
                          no literature found! click{" "}
                          <i
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={getLiteraturs}
                          >
                            this
                          </i>{" "}
                          to see all
                        </h4>
                      ) : (
                        <>
                          {literaturs?.map((item, index) => (
                            <SearchPage item={item} key={index} />
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
