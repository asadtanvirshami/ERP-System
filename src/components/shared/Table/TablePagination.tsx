import React from "react";
import { CardFooter, Typography, Button } from "@material-tailwind/react";

type Props = {
  currentPage: number;
  setCurrentPage:any,
  totalPages: number;

};

const TablePagination = ({setCurrentPage, totalPages, currentPage}: Props) => {
  const handlePrevClick = (currentPage:any, setCurrentPage:any) => {
    if (currentPage > 1) {
      setCurrentPage((prevPage:any) => prevPage - 1);
    }
  };

  console.log(currentPage)

  const handleNextClick = (currentPage:any, setCurrentPage:any) => {
    if (currentPage ) {
      setCurrentPage((prevPage:any) => prevPage + 1);
    }
  };

  // const handlePageClick = (pageNumber:number) => {
  //   if (pageNumber >= 1 && pageNumber <= totalPages) {
  //     onPageChange(pageNumber);
  //   }
  // };
  return (
    <div>
      {" "}
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button  onClick={()=>handlePrevClick(currentPage,setCurrentPage)} disabled={currentPage === 1} variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button  onClick={()=>handleNextClick(currentPage,setCurrentPage)} disabled={currentPage === totalPages} variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default TablePagination;
