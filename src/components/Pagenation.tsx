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
  handleNumber: any;
}

const Pagenation: React.FC<Props> = ({
  finalPage,
  loading,
  currentPage,
  handleNext,
  handlePrev,
  handleFirst,
  handleLast,
  handleNumber,
}) => {
  if (loading) {
    return <Spinner />;
  } else {
    if (currentPage < 4) {
      return (
        <Fragment>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li
                className={"page-item" + (currentPage === 1 ? " disabled" : "")}
              >
                <button className="page-link" onClick={handlePrev}>
                  前
                </button>
              </li>
              <li
                className={"page-item" + (currentPage === 1 ? " active" : "")}
              >
                <button className="page-link" onClick={handleFirst}>
                  1
                </button>
              </li>
              <li
                className={"page-item" + (currentPage === 2 ? " active" : "")}
              >
                <button className="page-link" onClick={() => handleNumber(2)}>
                  2
                </button>
              </li>
              <li
                className={"page-item" + (currentPage === 3 ? " active" : "")}
              >
                <button className="page-link" onClick={() => handleNumber(3)}>
                  3
                </button>
              </li>
              <li
                className={"page-item" + (currentPage === 4 ? " active" : "")}
              >
                <button className="page-link" onClick={() => handleNumber(4)}>
                  4
                </button>
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
    } else if (currentPage < finalPage - 2) {
      return (
        <Fragment>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="page-link" onClick={handlePrev}>
                  前
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={handleFirst}>
                  1
                </button>
              </li>
              <li className="page-item">
                <button className="page-link">...</button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handleNumber(currentPage - 1)}
                >
                  {currentPage - 1}
                </button>
              </li>
              <li className="page-item active">
                <button className="page-link">{currentPage}</button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handleNumber(currentPage + 1)}
                >
                  {currentPage + 1}
                </button>
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
    } else {
      return (
        <Fragment>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="page-link" onClick={handlePrev}>
                  前
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={handleFirst}>
                  1
                </button>
              </li>
              <li className="page-item">
                <button className="page-link">...</button>
              </li>
              <li
                className={
                  "page-item" + (currentPage === finalPage - 3 ? " active" : "")
                }
              >
                <button
                  className="page-link"
                  onClick={() => handleNumber(finalPage - 3)}
                >
                  {finalPage - 3}
                </button>
              </li>
              <li
                className={
                  "page-item" + (currentPage === finalPage - 2 ? " active" : "")
                }
              >
                <button
                  className="page-link"
                  onClick={() => handleNumber(finalPage - 2)}
                >
                  {finalPage - 2}
                </button>
              </li>
              <li
                className={
                  "page-item" + (currentPage === finalPage - 1 ? " active" : "")
                }
              >
                <button
                  className="page-link"
                  onClick={() => handleNumber(finalPage - 1)}
                >
                  {finalPage - 1}
                </button>
              </li>
              <li
                className={
                  "page-item" + (currentPage === finalPage ? " active" : "")
                }
              >
                <button className="page-link" onClick={handleLast}>
                  {finalPage}
                </button>
              </li>
              <li
                className={
                  "page-item" + (currentPage === finalPage ? " disabled" : "")
                }
              >
                <button className="page-link" onClick={handleNext}>
                  次
                </button>
              </li>
            </ul>
          </nav>
        </Fragment>
      );
    }
  }
};

export default Pagenation;
