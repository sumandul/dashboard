import Link from "next/link";
import { Else, If, Then } from "react-if";
import { useRouter } from "next/router";
import { Prev1Svg, Prev2Svg, Prev3Svg, NextSvg } from "@/svgicon";

function getPaginatedValue(c, m) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

function generateLink(pathname, prevParams, params) {
  return { pathname, query: { ...prevParams, ...params } };
}

export default function Pagination({
  pathname: path,
  currentPage,
  pages,
  position = "between",
  limit,
}) {

  const { query } = useRouter();
  const router = useRouter();
  return (
    <div
      className={`my-3 align-middle flex justify-between flex-wrap
    `}
    >
      <ul className=" mb-0 flex items-center  shadow-md bg-zapp-white px-4 py-2 rounded-[0.5rem] gap-2 sm:gap-10">
        <li className={`page-item${currentPage === 1 ? " d-none" : ""}`}>
          <Link
            href={generateLink(path, query, { page: 1 })}
            className="page-link"
          >
            <span>
              <Prev1Svg />
            </span>
          </Link>
        </li>
        <button  >
          <Link
            
            href={generateLink(path, query, { page:  currentPage - 1 ===0 ? 1:currentPage - 1  })}
            className="page-link"
          >
            <span>
              <Prev2Svg />
            </span>
          </Link>
        </button>
        {getPaginatedValue(currentPage, pages).map((page, index) => (
          <If condition={page === "..."} key={index}>
            <Then>
              <li className="page-item disabled">
                <a className="page-link">
                  <span>...</span>
                </a>
              </li>
            </Then>
            <Else>
              <li
                className={`page-item ${
                  currentPage === page ? "  text-zapp-primary   rounded-full" : ""
                }`}
              >
                <Link
                  href={generateLink(path, query, { page })}
                  className="page-link"
                >
                  {page}
                </Link>
              </li>
            </Else>
          </If>
        ))}
        <li className={`page-item${currentPage === pages ? " d-none" : ""}`}>
          <Link
            href={generateLink(path, query, { page:  currentPage ===pages ?pages: currentPage + 1 })}
            className="page-link"
          >
            <span>
              
              <Prev3Svg />
            </span>
          </Link>
        </li>
        <li className={`page-item${currentPage === pages ? " d-none" : ""}`}>
          <Link
            href={generateLink(path, query, { page: pages })}
            className="page-link"
          >
            <span>
              <NextSvg />
            </span>
          </Link>
        </li>
      </ul>

      {/* <div className="flex px-4 py-2 rounded-[0.5rem]   font-medium  gap-3 shadow-md   bg-zapp-white items-center  align-items-center">
        <span className="text-muted me-2">Show</span>
        <div>
          <select
            className="form-select form-select-sm"
            value={limit}
            onChange={(e) => {
              const { value } = e.target;
              router.push({
                pathname: router.pathname,
                query: { ...router.query, limit: value },
              });
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <span className="text-muted ms-2">per page</span>
        <br />

        <span className="text-muted ms-2">
          {currentPage} of {pages}
        </span>

        <span className="text-muted ms-2">({query.total} total records)</span>
      </div> */}
    </div>
  );
}
