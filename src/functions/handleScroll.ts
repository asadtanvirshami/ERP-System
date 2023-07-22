import debounce from "lodash.debounce";

const handleScroll = debounce(({data, totalUsers, setCurrentPage}:any) => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      data.length < totalUsers
    ) {
      setCurrentPage((prevPage:any) => prevPage + 1);
    }
  }, 500); // Adjust the debounce delay as needed (e.g., 200ms)