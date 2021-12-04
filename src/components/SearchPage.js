import React from "react";
import { useHistory } from "react-router";
import { PATH_FILE } from "../config/api";
import "../assets/stylesheets/home.css";

function SearchPage({ item }) {
  const history = useHistory();
  return (
    <div className="col-md-3">
      <embed
        src={PATH_FILE + item.attach}
        style={{ width: 200 }}
        type="application/pdf"
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%"
      />
      <h3
        className="title mt-3"
        onClick={() => history.push(`/literatur/${item.id}`)}
      >
        {item.title}
      </h3>
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-secondary autthor">{item.author}</h4>
        </div>
        <div className="col" />
        <div className="col-md-4">
          <h4 className="text-secondary text-end author">
            {item.publication_date}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
