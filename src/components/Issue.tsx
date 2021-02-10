import React, { useEffect, Fragment } from "react";
import Spinner from "./Spinner";

interface Props {
  getIssue: any;
  match: any;
  loading: boolean;
  issue: any;
}

const Issue: React.FC<Props> = ({ getIssue, match, loading, issue }) => {
  useEffect(() => {
    getIssue(match.params.number);
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="card card-body">
        <h3>タイトル</h3>
        <p>{issue.title}</p>
        <h3>本文</h3>
        <p>{issue.body}</p>
      </div>
    );
  }
};

export default Issue;
