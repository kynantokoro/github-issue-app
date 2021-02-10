import React, { Fragment } from "react";
import { Link } from "react-router-dom";

interface Props {
  issueNumber: number;
  title: string;
}

const IssueItem: React.FC<Props> = ({ issueNumber, title }) => {
  const issueLink = "/issues/" + String(issueNumber);
  return (
    <li className="list-group-item list-group-item-action">
      <p>issue番号: {issueNumber}</p>
      <Link to={issueLink}>{title}</Link>
    </li>
  );
};

export default IssueItem;
