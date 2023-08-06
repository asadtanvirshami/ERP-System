import React, { useEffect} from "react";
import debounce from "lodash.debounce";

import { Checkbox, Spinner } from "@material-tailwind/react";
import LoadingButton from "@/src/components/shared/Buttons/Loading";
import Button from "@/src/components/shared/Buttons/Button";

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
}: any) => {
  
  const handleScroll = debounce(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      users.length < totalUsers
    ) {
      setCurrentPage((prevPage: any) => prevPage + 1);
    }
  }, 500); // Adjust the debounce delay as needed (e.g., 200ms)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [users.length, currentPage]);

  return (
    <div>
      <div
        className="max-h-[30rem] max-w-[90rem] overflow-y-auto"
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
            {Loading && <p>Loading...</p>}
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
          <LoadingButton   style="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300" />
        ) : (
          <>
            {users?.length >= 1 && (
              <div>
                <Button
                style="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  label={edit ? "Update" : "Create"}
                  type="submit"
                />
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
