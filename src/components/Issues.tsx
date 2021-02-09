import React, { useEffect } from "react";

interface Props {
  getIssue: any;
  getIssues: any;
  match: any;
}

const Issues: React.FC<Props> = ({ getIssue, getIssues, match }) => {
  console.log(match);
  useEffect(() => {
    getIssues();
  }, []);
  return <div>Issues</div>;
};

export default Issues;
