const checkIsTwoDArray = (arr:any) => {
  if (!Array.isArray(arr)) {
    return false; // Not an array
  }

  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      return false; // Found a non-array element, so it's not 2D
    }
  }

  return true; // All elements are arrays, so it's a 2D array
};

export { checkIsTwoDArray };
