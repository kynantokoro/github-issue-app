import React, { Fragment } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

interface Props {
  finalPage: number;
  loading: boolean;
  currentPage: number;
  handleNext: any;
  handlePrev: any;
  handleFirst: any;
  handleLast: any;
}

const Pagenation: React.FC<Props> = ({
  finalPage,
  loading,
  currentPage,
  handleNext,
  handlePrev,
  handleFirst,
  handleLast,
}) => {
  if (loading) {
    return <Spinner />;
  } else {
    let previousLink = `/issues?page=${currentPage - 1}`;
    let nextLink = `/issues?page=${currentPage + 1}`;
    let finalLink = `/issues?page=${finalPage}`;
    return (
      <Fragment>
        <p>{currentPage}</p>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button className="page-link" onClick={handlePrev}>
                前
              </button>
            </li>
            <li className="page-item active">
              <button className="page-link" onClick={handleFirst}>
                1
              </button>
            </li>
            <li className="page-item">
              <button className="page-link">...</button>
            </li>
            <li className="page-item">
              <button className="page-link">{currentPage}</button>
            </li>
            <li className="page-item">
              <button className="page-link">...</button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={handleLast}>
                {finalPage}
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={handleNext}>
                次
              </button>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
};

export default Pagenation;
