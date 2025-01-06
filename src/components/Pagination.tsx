import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface PaginationProps {
  totalPage: number;
  page: number;
  pageSize: number;
  paginationSize: number;
  pathName: string;
}

export default function Pagination(props: PaginationProps) {
  const { totalPage, page, pageSize, paginationSize, pathName } = props;
  const newPaginationSize = paginationSize - 2;

  let startPage = Math.max(1, page - Math.floor(newPaginationSize / 2));
  let endPage = Math.min(startPage + newPaginationSize - 1, totalPage);
  const condition = endPage - startPage + 1 < newPaginationSize;
  let selectPageLast = true;
  let selectPageFirst = true;

  if (condition) {
    startPage = Math.max(1, endPage - newPaginationSize + 1);
  }

  const createArr = endPage - startPage + 1;

  // console.log("startPage", startPage);
  // console.log("endPage", endPage);
  // console.log("createArr", createArr);
  // console.log("condition", condition);
  // console.log("totalPage", totalPage);

  if (createArr < 0) return;

  let numberPage = Array.from(Array(createArr).keys()).map(
    (i) => i + startPage
  );

  if (numberPage.find((i) => i == 1)) {
    selectPageFirst = false;
  }

  if (numberPage.find((i) => i == totalPage)) {
    selectPageLast = false;
  }

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {page > 1 ? (
          <Link
            href={{
              pathname: `${pathName}`,
              query: { page: page - 1, pageSize },
            }}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Link>
        ) : (
          <Link
            href="#"
            className="cursor-not-allowed relative inline-flex items-center rounded-md border border-white-300 bg-gray px-4 py-2 text-sm font-medium text-gray-700"
          >
            Previous
          </Link>
        )}

        {page >= totalPage ? (
          <Link
            className="cursor-not-allowed relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-700"
            href={{
              pathname: `${pathName}`,
              query: { page: page + 1, pageSize },
            }}
          >
            Next
          </Link>
        ) : (
          <Link
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            href={{
              pathname: `${pathName}`,
              query: { page: page + 1, pageSize },
            }}
          >
            Next
          </Link>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 pr-4">
            Showing <span className="font-medium">{page}</span> to{" "}
            <span className="font-medium">{pageSize}</span> of{" "}
            <span className="font-medium">{totalPage}</span> results
          </p>
        </div>

        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            {page > 1 ? (
              <Link
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                href={{
                  pathname: `${pathName}`,
                  query: { page: page - 1, pageSize },
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                className="cursor-not-allowed relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                href="#"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </Link>
            )}

            {selectPageFirst ? (
              <Link
                href={{
                  pathname: `${pathName}`,
                  query: { page: 1, pageSize },
                }}
                key={1}
                aria-current="page"
                className="relative z-10 inline-flex items-center px-4 py-2 text-sm ring-1 ring-inset font-semibold text-red focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                1
              </Link>
            ) : null}

            {selectPageFirst ? (
              <span className="relative inline-flex items-center  px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset  ring-gray-300 focus:outline-offset-0">
                ...
              </span>
            ) : null}

            {numberPage.map((i) => {
              if (i == page) {
                return (
                  <Link
                    href={{
                      pathname: `${pathName}`,
                      query: { page: i, pageSize },
                    }}
                    key={i}
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-[#FFFADD] px-4 py-2 text-sm ring-1 ring-inset font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    {i}
                  </Link>
                );
              } else {
                return (
                  <Link
                    href={{
                      pathname: `${pathName}`,
                      query: { page: i, pageSize },
                    }}
                    key={i}
                    aria-current="page"
                    className="relative z-10 inline-flex items-center  px-4 py-2 text-sm ring-1 ring-inset font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {i}
                  </Link>
                );
              }
            })}

            {selectPageLast ? (
              <span className="relative inline-flex items-center  px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset  ring-gray-300 focus:outline-offset-0">
                ...
              </span>
            ) : null}

            {selectPageLast ? (
              <Link
                href={{
                  pathname: `${pathName}`,
                  query: { page: totalPage, pageSize },
                }}
                key={totalPage}
                aria-current="page"
                className="relative z-10 inline-flex items-center px-4 py-2 text-sm ring-1 ring-inset font-semibold text-red focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {totalPage}
              </Link>
            ) : null}

            {page != totalPage ? (
              <Link
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                href={{
                  pathname: `${pathName}`,
                  query: { page: page + 1, pageSize },
                }}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                className="cursor-not-allowed relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                href="#"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
