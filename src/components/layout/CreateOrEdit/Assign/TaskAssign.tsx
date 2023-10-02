import React, { useEffect, useRef } from "react";
import debounce from "lodash.debounce";

import { Checkbox, Spinner } from "@material-tailwind/react";

import { Agents } from "@/src/interfaces/Agents";

const TaskAssign = ({
  checkList,
  isCheck,
  setIsCheck,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  users,
}: any) => {
  const containerRef: any = useRef();
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const tolerance = 5; // Add a small tolerance, adjust as needed.

      if (scrollTop + clientHeight + tolerance >= scrollHeight) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }
  };
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <div
        ref={containerRef}
        className="sm:w-full max-h-[23rem] lg:w-[30rem] l overflow-y-auto"
      >
        {users?.length > 0 ? (
          <>
            {users?.map((item: any, index: number) => (
              <>
                {item.length > 0 ? (
                  <>
                    {item.map((items: Agents, i: number) => {
                      return (
                        <label
                          key={items.id}
                          htmlFor="vertical-list-react"
                          className="flex items-center w-full cursor-pointer"
                        >
                          <div className="mr-3">
                            <>
                              <Checkbox
                                ripple={false}
                                className="hover:before:opacity-0"
                                type="checkbox"
                                onChange={(e: any) =>
                                  checkList(e, items, setIsCheck, isCheck)
                                }
                                checked={isCheck.includes(items.id)}
                              />
                            </>
                          </div>
                          <p className="text-sm mb-1">{items.email}</p>
                        </label>
                      );
                    })}
                  </>
                ) : (
                  <p>No agents to show.</p>
                )}
              </>
            ))}
            {isFetchingNextPage && (
              <div className="flex justify-center items-center">
                <Spinner fontSize={22} color="red" />
              </div>
            )}
          </>
        ) : (
          <div className="flex align-middle justify-center p-12">
            <Spinner fontSize={22} color="red" />
          </div>
        )}
      </div>

      <hr />
    </div>
  );
};

export default TaskAssign;
