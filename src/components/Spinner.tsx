import React, { Fragment } from "react";
import spinner from "./spinner.gif";

/**
 *非同期処理でローディング中に表示
 */

const Spinner = () => {
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>;
};

export default Spinner;
