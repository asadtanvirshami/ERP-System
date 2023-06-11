import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Checkbox
} from "@material-tailwind/react";

type Props = {
  state: any;
};

export const List = ({ state }: Props) => {
  return (
    <Menu>
      <MenuHandler>
        <Button variant="text" color="red">
          View
        </Button>
      </MenuHandler>
      {state.length > 0 ? (
        <MenuList className="max-h-72">
          {state.map((ele: any, i: number) => {
            return (
              <MenuItem key={ele.id}>
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2"
                >
                  <Checkbox
                    ripple={false}
                    id="item-1"
                    checked={ele.id}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                  />
                  {ele.email}
                </label>
              </MenuItem>
            );
          })}
        </MenuList>
      ) : (
        <MenuList className="max-h-72">
          <MenuItem>{state.comments}</MenuItem>;
        </MenuList>
      )}
    </Menu>
  );
};
