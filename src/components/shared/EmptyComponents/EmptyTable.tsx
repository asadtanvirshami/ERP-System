import React from "react";
import { Typography, CardBody, Spinner } from "@material-tailwind/react";
import { DotLoader } from "react-spinners";

type Props = {
  cols: any;
  loading: boolean;
};

const EmptyTable = ({ cols, loading }: Props) => {
  return (
    <React.Fragment>
      <div className="overflow-scroll px-0 border rounded-lg mt-5 mb-5">
        <table className="table rounded-lg border-collapse mt-0 w-full min-w-max table-auto text-left border">
          <thead className="border">
            <tr className="border">
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
              {loading == false && (
                <td className="py-5">
                  <span className="ml-4">No data to show.</span>
                </td>
              )}
              {loading == true && (
                <td className="py-5 flex align-middle items-center justify-center px-[32rem]">
                  <span className="ml-4 flex align-middle items-center justify-center mx-auto">
                    <Spinner color="red" height={300} width={50} />
                  </span>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default EmptyTable;
