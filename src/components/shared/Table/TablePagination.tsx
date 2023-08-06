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
  
  const getPagesToShow = () => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2];
    } else if (currentPage === 2) {
      return [1, 2, 3];
    } else if (currentPage === totalPages) {
      return [totalPages - 1, totalPages];
    } else if (currentPage === totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage, currentPage + 1];
    }
  };
  const pagesToShow = getPagesToShow();

  const handleNextClick = (currentPage:any, setCurrentPage:any) => {
    if (currentPage ) {
      setCurrentPage((prevPage:any) => prevPage + 1);
    }
  };

  const handlePageClick = (pageNumber:number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
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
          {pagesToShow.map((page,index) => (
        <button
          key={index}
          onClick={() =>handlePageClick(page)}
          className={page === currentPage ? 'font-bold text-gray-800' : ''}
        >
          {page}
        </button>
      ))}
          <Button  onClick={()=>handleNextClick(currentPage,setCurrentPage)} disabled={currentPage === totalPages} variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default TablePagination;
