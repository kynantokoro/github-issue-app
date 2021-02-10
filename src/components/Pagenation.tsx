import React, { Fragment } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

interface Props {
  finalPage: number;
  loading: boolean;
  currentPage: number;
}

const Pagenation: React.FC<Props> = ({ finalPage, loading, currentPage }) => {
  if (loading) {
    return <Spinner />;
  } else {
    let previousLink = `/issues/${currentPage - 1}`;
    let nextLink = `/issues/${currentPage + 1}`;
    let finalLink = `/issues/${finalPage}`;
    return (
      <Fragment>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <Link to="/" className="page-link">
                Previous
              </Link>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <Link to={finalLink} className="page-link">
                {finalPage}
              </Link>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
};

export default Pagenation;
