import React, { useEffect } from "react";
import debounce from "lodash.debounce";

import { Checkbox, Spinner, Button } from "@material-tailwind/react";
import LoadingButton from "@/src/components/shared/Buttons/Loading";

const TaskAssign = ({
  checkList,
  isCheck,
  setIsCheck,
  loading,
  edit,
  message,
  currentPage,
  setCurrentPage,
  totalUsers,
  users,
  Loading,
  disabled,
}: any) => {
  const handleScroll = debounce(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 400 &&
      users.length < totalUsers &&
      !Loading
    ) {
      setCurrentPage((prevPage: any) => prevPage + 1);
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    console.log(users);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to add and remove the listener only once

  return (
    <div>
      <div
        className="max-h-[23rem] max-w-[90rem] overflow-y-auto"
        onScroll={handleScroll}
      >
        {users?.length > 0 ? (
          <>
            {users?.map((item: any, index: number) => (
              <>
                <label
                  key={item.id}
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
                          checkList(e, item, setIsCheck, isCheck)
                        }
                        checked={isCheck.includes(item.id)}
                      />
                    </>
                  </div>
                  <p className="text-sm mb-1">{item.email}</p>
                </label>
              </>
            ))}
            {Loading && (
              <div className="flex justify-center items-center">
                <Spinner fontSize={22} color="red" />
              </div>
            )}
          </>
        ) : (
          <div className="flex align-middle justify-center p-12">
            <Spinner color="red" height={30} width={30} />
          </div>
        )}
      </div>
      <hr />
      <div className="mb-3 mt-2">
        {loading ? (
          <LoadingButton style="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300" />
        ) : (
          <>
            {users?.length >= 1 && (
              <div>
                <Button
                  ripple={false}
                  disabled={disabled}
                  className="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  type="submit"
                  size="md"
                >
                  {edit ? "Update" : "Assign"}
                </Button>
                <p className="mt-2">{message}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskAssign;
