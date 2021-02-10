import React, { useEffect, Fragment } from "react";
import IssueItem from "./IssueItem";
import Spinner from "./Spinner";

import { IssuesResponse } from "../types";

interface Props {
  getIssues: (num: number) => Promise<void>;
  issues: IssuesResponse;
  loading: boolean;
  currentPage: number;
}

const Issues: React.FC<Props> = ({
  getIssues,
  issues,
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
        {issues.map((issue) => (
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
