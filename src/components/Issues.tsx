import React, { useEffect, Fragment } from "react";
import IssueItem from "./IssueItem";
import Spinner from "./Spinner";

interface Props {
  getIssues: any;
  issues: any;
  match: any;
  loading: boolean;
}

const Issues: React.FC<Props> = ({ getIssues, issues, match, loading }) => {
  useEffect(() => {
    getIssues();
  }, []);
  console.log(issues);
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
