import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Issues from "./components/Issues";
import Issue from "./components/Issue";
import Pagination from "./components/Pagenation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import axios from "axios";

let githubCliendId: string | undefined;
let githubClientSecret: string | undefined;

//GithubAPIの認証ClientIDとSecretをproductionはnetlifyのサーバーの環境変数みたいなのから取得する
if (process.env.NODE_ENV !== "production") {
  githubCliendId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubCliendId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const App = () => {
  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(false);
  const [pgnationLoading, setPgnationLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(20);

  //Paginationの末尾のページ番号を取得
  const getFinalPage = async () => {
    setPgnationLoading(true);

    console.log("calcFinalPage");
    let batch1Pagenumber: number;
    let batch1Pagenumbers: number[] = [];
    let batch2Pagenumber: number;
    let batch2Pagenumbers: number[] = [];
    let finalPagenumber: number = 0;
    let ended: boolean = false;
    let httpRequestCount: number = 0;
    const batch1ParallelRequestCount: number = 10;
    const batch2ParallelRequestCount: number = 5;
    let pages: number[] = new Array(batch1ParallelRequestCount).fill(0);

    //Batch1
    //100エントリーごとでおおまかな末尾ページを算出
    let ii = 0;
    do {
      await Promise.all(
        pages.map(async (n, i) => {
          console.log("11111");
          let res = await axios.get(
            `https://api.github.com/repos/facebook/react/issues?page=${
              ii * batch1ParallelRequestCount + i + 1
            }&per_page=100&client_id=${githubCliendId}&client_secret=${githubClientSecret}`
          );
          httpRequestCount++;
          if (res.data.length === 0) {
            batch1Pagenumbers.push(ii * batch1ParallelRequestCount + i + 1);
            ended = true;
          }
        })
      );
      ii++;
    } while (!ended);

    //Batch2のスタート地点batch2Pagenumberを算出
    console.log("batch1Pagenumbers");
    console.log(batch1Pagenumbers);
    batch1Pagenumber = Math.min.apply(null, batch1Pagenumbers);
    ended = false;
    batch2Pagenumber = Math.floor(((batch1Pagenumber - 2) * 100) / perPage);
    console.log("batch2Pagenumber");
    console.log(batch2Pagenumber);
    pages = new Array(batch2ParallelRequestCount).fill(0);

    //Batch2
    //実際のページ表示のエントリー数で末尾ページを算出
    ii = 0;
    do {
      await Promise.all(
        pages.map(async (n, i) => {
          console.log("2222");
          let res = await axios.get(
            `https://api.github.com/repos/facebook/react/issues?page=${
              batch2Pagenumber + ii * batch2ParallelRequestCount + i
            }&per_page=${perPage}&client_id=${githubCliendId}&client_secret=${githubClientSecret}`
          );
          console.log(
            "res" + (batch2Pagenumber + ii * batch2ParallelRequestCount + i)
          );
          console.log(res.data);
          httpRequestCount++;
          if (res.data.length === 0) {
            batch2Pagenumbers.push(
              batch2Pagenumber + ii * batch2ParallelRequestCount + i
            );
            ended = true;
          }
        })
      );
      ii++;
    } while (!ended);
    //計算終了！！
    finalPagenumber = Math.min.apply(null, batch2Pagenumbers) - 1;

    console.log("http request for pagination was...: " + httpRequestCount);

    setPgnationLoading(false);
    setFinalPage(finalPagenumber);
  };

  //現ページのIssues一覧を取得
  const getIssues = async () => {
    console.log("GetIssues");
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/repos/facebook/react/issues?page=${currentPage}&per_page=${perPage}&client_id=${githubCliendId}&client_secret=${githubClientSecret}`
    );

    console.log(res);
    setIssues(res.data);
    setLoading(false);
  };

  const getIssue = async (issue_number: string) => {
    console.log("GetIssue");
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/repos/facebook/react/issues/${issue_number}?client_id=${githubCliendId}&client_secret=${githubClientSecret}`
    );

    console.log(res.data);
    setIssue(res.data);
    setLoading(false);
  };

  useEffect(() => {
    //getFinalPage();
    //getIssues();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container p-3">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Redirect to="/issues" />}
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
                  />
                  <Pagination
                    {...props}
                    finalPage={finalPage}
                    loading={pgnationLoading}
                    currentPage={currentPage}
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
    </Router>
  );
};

export default App;
