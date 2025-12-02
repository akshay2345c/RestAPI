import React, { useState, useEffect } from "react";
import { getPost } from "../Api/PostApi";
import "./Cards.css";

const Cards = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const limit = 10; // posts per page

  const getpostdata = async () => {
    try {
      const res = await getPost(pageNo, limit);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getpostdata();
  }, [pageNo]); // refetch when page changes

  return (
    <section>
      <ul className="cardmain">
        {data.map((curelem) => {
          const { id, body, title } = curelem;
          return (
            <li key={id}>
              <h4>{id}</h4>
              <p>
                <span>Title: </span> {title}
              </p>
              <p>
                <span>Message: </span> {body}
              </p>
              <div className="buttonmain">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pagination Controls */}
      <div className="buttonmain pagibtn">
        <button
          onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
          disabled={pageNo === 1}
        >
          Previous
        </button>

        <span>Page {pageNo}</span>

        <button
          onClick={() => setPageNo((prev) => prev + 1)}
          disabled={data.length < limit}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Cards;
