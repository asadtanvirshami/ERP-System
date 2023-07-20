import React from "react";
import { CardFooter, Typography, Button } from "@material-tailwind/react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange:any
};

const TablePagination = ({onPageChange, totalPages, currentPage}: Props) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber:number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };
  return (
    <div>
      {" "}
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button  onClick={handlePrevClick} disabled={currentPage === 1} variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button  onClick={handleNextClick} disabled={currentPage === totalPages} variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default TablePagination;
