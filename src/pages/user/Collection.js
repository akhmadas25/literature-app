import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";
import { API, PATH_FILE } from "../../config/api";
import "../../assets/stylesheets/home.css";

function Collection() {
  const history = useHistory();
  const [collection, setCollection] = useState([]);
  const getCollection = async () => {
    try {
      const response = await API.get("/collection");
      setCollection(response.data.collection);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className="container-fluid main bg-dark text-light">
      <div className="ms-3 me-3">
        <Navbar collection={collection} />
        <div className="header ms-3 my-3 ">
          <h1>My Collection</h1>
          <div className="row mt-5">
            {collection.length < 1 ? (
              <div className="text-center">
                <img
                  src="https://stories.freepiklabs.com/storage/18539/no-data-pana-1440.png"
                  style={{ height: 200 }}
                />
                <h3>you don't have any collection yet</h3>
              </div>
            ) : (
              <>
                {collection?.map((item, index) => (
                  <div className="col-md-3" item={item} key={index}>
                    <embed
                      src={PATH_FILE + item.literatur.attach}
                      style={{ width: 250, height: 300 }}
                      type="application/pdf"
                      frameBorder="0"
                      scrolling="auto"
                      height="100%"
                      width="100%"
                    />
                    <h3
                      className="mt-3 title"
                      onClick={() =>
                        history.push(`/collection/${item.literaturId}`)
                      }
                    >
                      {item.literatur.title}
                    </h3>
                    <div className="row">
                      <div className="col-md-7">
                        <h4
                          className="text-secondary"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.literatur.author}
                        </h4>
                      </div>
                      <div className="col-md-3">
                        <h4
                          className="text-secondary text-end"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {item.literatur.publication_date}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
