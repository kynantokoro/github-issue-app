import React, { useEffect, Fragment } from "react";
import IssueItem from "./IssueItem";
import Spinner from "./Spinner";
import { useLocation } from "react-router-dom";

interface Props {
  getIssues: any;
  issues: any;
  match: any;
  loading: boolean;
  currentPage: number;
}

const Issues: React.FC<Props> = ({
  getIssues,
  issues,
  match,
  loading,
  currentPage,
}) => {
  useEffect(() => {
    getIssues(currentPage);
  }, [currentPage]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <ul className="list-group mb-5">
        {issues.map((issue: any) => (
          <IssueItem
            key={issue.number}
            issueNumber={issue.number}
            title={issue.title}
          />
        ))}
      </ul>
    );
  }
};

export default Issues;
