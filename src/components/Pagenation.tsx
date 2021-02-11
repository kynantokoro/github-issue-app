import React, { Fragment, useMemo } from "react";
import Spinner from "./Spinner";

interface Props {
  finalPage: number;
  loading: boolean;
  currentPage: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleFirst: () => void;
  handleLast: () => void;
  handleNumber: (num: number) => void;
}

type PaginationButtonType =
  | "next"
  | "prev"
  | "number"
  | "omit"
  | "first"
  | "last";

type PaginationButton = {
  label: string;
  buttonType: PaginationButtonType;
  pageNumber?: number;
};

const buildPagination = (
  currentPage: number,
  finalPage: number
): PaginationButton[] => {
  const buttons: PaginationButton[] = [];

  if (currentPage < 4) {
    buttons.push({ label: "前", buttonType: "prev" });
    buttons.push({ label: "1", buttonType: "number", pageNumber: 1 });
    buttons.push({ label: "2", buttonType: "number", pageNumber: 2 });
    buttons.push({ label: "3", buttonType: "number", pageNumber: 3 });
    buttons.push({ label: "4", buttonType: "number", pageNumber: 4 });
    buttons.push({ label: "...", buttonType: "omit" });
    buttons.push({ label: String(finalPage), buttonType: "last" });
    buttons.push({ label: "次", buttonType: "next" });
    buttons.push({ label: "最後", buttonType: "last" });
  } else if (currentPage < finalPage - 2) {
    buttons.push({ label: "最初", buttonType: "first" });
    buttons.push({ label: "前", buttonType: "prev" });
    buttons.push({ label: "1", buttonType: "number", pageNumber: 1 });
    buttons.push({ label: "...", buttonType: "omit" });
    buttons.push({
      label: String(currentPage - 1),
      buttonType: "number",
      pageNumber: currentPage - 1,
    });
    buttons.push({
      label: String(currentPage),
      buttonType: "number",
      pageNumber: currentPage,
    });
    buttons.push({
      label: String(currentPage + 1),
      buttonType: "number",
      pageNumber: currentPage + 1,
    });
    buttons.push({ label: "...", buttonType: "omit" });
    buttons.push({ label: String(finalPage), buttonType: "number" });
    buttons.push({ label: "次", buttonType: "next" });
    buttons.push({ label: "最後", buttonType: "last" });
  } else {
    buttons.push({ label: "最初", buttonType: "first" });
    buttons.push({ label: "前", buttonType: "prev" });
    buttons.push({ label: "...", buttonType: "omit" });
    buttons.push({
      label: String(finalPage - 3),
      buttonType: "number",
      pageNumber: finalPage - 3,
    });
    buttons.push({
      label: String(finalPage - 2),
      buttonType: "number",
      pageNumber: finalPage - 2,
    });
    buttons.push({
      label: String(finalPage - 1),
      buttonType: "number",
      pageNumber: finalPage - 1,
    });
    buttons.push({ label: String(finalPage), buttonType: "number" });
  }

  return buttons;
};

const Pagenation: React.FC<Props> = ({
  finalPage,
  loading,
  currentPage,
  handleNext,
  handlePrev,
  handleFirst,
  handleLast,
  handleNumber,
}) => {
  const page = useMemo(() => buildPagination(currentPage, finalPage), [
    currentPage,
    finalPage,
  ]);

  if (loading) {
    return <Spinner />;
  }

  // ちょっとこれ汚いかも. あとhandleFirst, lastは実際handleNumberで実装できる
  const typeFuncMap = {
    next: handleNext,
    prev: handlePrev,
    first: handleFirst,
    last: handleLast,
    number: null,
    omit: null,
  };

  return (
    <Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {page.map((pa, i) => {
            const disabled =
              currentPage === pa.pageNumber || pa.buttonType === "omit";
            let onClickFunc = typeFuncMap[pa.buttonType];
            if (pa.buttonType === "number") {
              onClickFunc = () => handleNumber(pa.pageNumber || 0);
            } else if (pa.buttonType === "last") {
              onClickFunc = () => handleNumber(finalPage);
            }

            return (
              <li
                className={"page-item" + (disabled ? " disabled" : "")}
                key={i}
              >
                <button
                  className="page-link"
                  onClick={() => onClickFunc && onClickFunc()}
                >
                  {pa.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Pagenation;
