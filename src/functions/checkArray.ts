const checkIsTwoDArray = (arr: any) => {
  if (!Array.isArray(arr)) {
    console.log(arr);
    return false; // Not an array
  }

  if (arr.length === 0) {
    return false; // Empty array, not a 2D array
  }

  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      return false; // Found a non-array element, so it's not 2D
    }
  }

  return true; // All elements are arrays, so it's a non-empty 2D array
};

const convertDate = (d:any) => {
  //formating the date
  let date = d.split("-");
  const new_format = date[1] + "/" + date[2] + "/" + date[0];
  return new_format
};

export { checkIsTwoDArray, convertDate };
