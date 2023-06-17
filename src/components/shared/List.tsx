import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Checkbox,
} from "@material-tailwind/react";

type Props = {
  state: any;
  onClick:any
};

export const List = ({ onClick, state}: Props) => {
  return (
    <div className="relative z-50">
      {" "}
      {/* Add a parent container with relative positioning and a high z-index */}
      <Menu>
        <MenuHandler>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4  rounded focus:outline-none">
            View
          </button>
        </MenuHandler>
        {state.length > 0 ? (
          <MenuList className="max-h-72">
            {state.map((ele: any, i: number) => {
              return (
                <li className="list-none" key={ele.id}>
                  <label
                    htmlFor="item-1"
                    className="flex cursor-pointer items-center gap-2 p-2"
                  >
                    <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    </button>
                    {ele.email}
                  </label>
                </li>
              );
            })}
            <MenuItem>
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Add
              </label>
            </MenuItem>
          </MenuList>
        ) : (
          <MenuList className="max-h-72">
            <MenuItem>{state.comments}</MenuItem>;
          </MenuList>
        )}
      </Menu>
    </div>
  );
};
