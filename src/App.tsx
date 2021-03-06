import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Issues from "./components/Issues";
import Issue from "./components/Issue";
import Pagination from "./components/Pagenation";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import axios from "axios";

import { IssuesResponse } from "./types";

const App = () => {
  const [issues, setIssues] = useState<IssuesResponse>([]);
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(false);
  const [pgnationLoading] = useState(false);
  const [perPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(useLocation().search.replace("?page=", ""))
  );
  const [finalPage, setFinalPage] = useState(20);
  const history = useHistory();

  //現ページのIssues一覧を取得
  const getIssues = async (num: number) => {
    setLoading(true);
    const res = await axios.get<IssuesResponse>(
      `https://api.github.com/repos/facebook/react/issues?page=${num}&per_page=${perPage}`
    );

    // Paginationの末尾のページ番号を取得
    // これはレスポンスヘッダに含まれるLinkから取得できる
    const page = extractFinalPageFromLinkHeader(res.headers.link);
    setIssues(res.data);
    setLoading(false);

    if (page) {
      setFinalPage(Number(page));
    }
  };

  const getIssue = async (issue_number: string) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/repos/facebook/react/issues/${issue_number}`
    );

    setIssue(res.data);
    setLoading(false);
  };

  const handleNext = () => {
    const page = currentPage + 1;
    setCurrentPage(page);
    history.push(`/issues?page=${page}`);
  };

  const handleLast = () => {
    const page = finalPage;
    setCurrentPage(page);
    history.push(`/issues?page=${page}`);
  };

  const handlePrev = () => {
    const page = currentPage - 1;
    setCurrentPage(page);
    history.push(`/issues?page=${page}`);
  };

  const handleFirst = () => {
    setCurrentPage(1);
    history.push(`/issues?page=1`);
  };

  const handleNumber = (num: number): void => {
    setCurrentPage(num);
    history.push(`/issues?page=${num}`);
  };

  useEffect(() => {
    handleFirst();
  }, []);

  return (
    <div className="App">
      <Navbar handleFirst={handleFirst} />
      <div className="container p-3">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Redirect to="/issues?page=1" />}
          ></Route>
          <Route
            exact
            path="/issues"
            render={(props) => (
              <Fragment>
                <Issues
                  {...props}
                  getIssues={getIssues}
                  issues={issues}
                  loading={loading}
                  currentPage={currentPage}
                />
                <Pagination
                  {...props}
                  currentPage={currentPage}
                  finalPage={finalPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  handleFirst={handleFirst}
                  handleLast={handleLast}
                  handleNumber={handleNumber}
                  loading={pgnationLoading}
                />
              </Fragment>
            )}
          ></Route>
          <Route exact path="/about" component={About}></Route>
          <Route
            exact
            path="/issues/:number"
            render={(props) => (
              <Fragment>
                <Issue
                  {...props}
                  getIssue={getIssue}
                  loading={loading}
                  issue={issue}
                />
              </Fragment>
            )}
          ></Route>
        </Switch>
      </div>
    </div>
  );
};

const extractFinalPageFromLinkHeader = (link: string): string | undefined => {
  // link headerは次のような形で来る https://docs.github.com/en/rest/guides/traversing-with-pagination
  // "<https://api.github.com/repositories/10270250/issues?page=2&per_page=10>; rel=\"next\", <https://api.github.com/repositories/10270250/issues?page=74&per_page=10>; rel=\"last\""

  // rel=lastを取得すると最後のpageが分かる
  const lastrel = link.split(",").filter((s) => s.includes('rel="last"'))[0];
  if (!lastrel) return;

  const matched = lastrel.match(/page=(\d+).*$/);
  if (!matched) return;

  return matched[1];
};

export default App;
