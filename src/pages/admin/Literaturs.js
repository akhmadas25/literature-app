import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../assets/stylesheets/table.css";
import { API, PATH_FILE } from "../../config/api";
import swal from "sweetalert";

function Literaturs() {
  const [literaturs, setLiteraturs] = useState();
  const getLiteraturs = async () => {
    try {
      const response = await API.get("/literaturs");

      setLiteraturs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Status = ({ item }) => {
    if (item.status === "verified") {
      return <p className="alert-success">{item.status}</p>;
    } else if (item.status === "waiting for verified") {
      return <p className="alert-warning">{item.status}</p>;
    } else {
      return <p className="alert-danger">{item.status}</p>;
    }
  };

  const Action = ({ item }) => {
    const handleAprove = async () => {
      try {
        const id = item.id;
        const data = { status: "verified" };

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const body = JSON.stringify(data);
        await API.patch(`/literatur/${id}`, body, config);
        getLiteraturs();
        swal({
          title: "successfully aproved",
          icon: "success",
        });
      } catch (error) {
        console.log(error);
      }
    };

    const handleCancel = async () => {
      try {
        const id = item.id;
        const data = { status: "cancel" };

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const body = JSON.stringify(data);
        await API.patch(`/literatur/${id}`, body, config);
        getLiteraturs();
        swal({
          title: "canceled",
          icon: "warning",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (item.status === "verified") {
      return <i class="fas fa-check-circle fa-2x text-success"></i>;
    } else if (item.status === "waiting for verified") {
      return (
        <>
          <button
            type="button"
            className="btn btn-danger px-3 text-light"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button
            type="button"
            className="btn btn-success px-3 ms-3 text-light"
            onClick={handleAprove}
          >
            aprove
          </button>
        </>
      );
    } else if (item.status === "cancel") {
      return <i class="fas fa-times-circle text-danger fa-2x"></i>;
    }
  };

  useEffect(() => {
    getLiteraturs();
  }, []);

  return (
    <div className="container-fluid main px-0">
      <Navbar />

      <div className="container-fluid text-start pe-5 pt-5">
        <h3 className="container px-0">Book Verification</h3>
        <table
          className="table table-hover container mt-3"
          id="Table"
          striped
          bordered
          hover
        >
          <thead className="text-center">
            <th>No</th>
            <th>User or author</th>
            <th>ISBN</th>
            <th>Literatur</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          {literaturs?.map((item, index) => (
            <tbody item={item} key={index}>
              <tr className="text-center">
                <td>{item.author}</td>
                <td>{item.ISBN}</td>
                <td>
                  <p
                    className="text-primary"
                    onClick={() => window.open(PATH_FILE + item.attach)}
                  >
                    {item.title}
                  </p>
                </td>
                <td>
                  <Status item={item} />
                </td>
                <td className="text-center">
                  <Action item={item} />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Literaturs;
