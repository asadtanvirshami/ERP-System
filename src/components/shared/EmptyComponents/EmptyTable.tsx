import React from "react";
import { Typography, CardBody } from "@material-tailwind/react";

type Props = {
  cols: any;
};

const EmptyTable = ({ cols }: Props) => {
  return (
    <React.Fragment>
        <CardBody className="overflow-scroll px-0">
      <table className="mt-2 w-full min-w-max table-auto text-left">
        <thead className="">
          <tr>
            {cols.map((head: string) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-5">
              <span className="ml-4">No data to show.</span>
            </td>
          </tr>
        </tbody>
      </table>
    </CardBody>
    </React.Fragment>
  );
};

export default EmptyTable;
