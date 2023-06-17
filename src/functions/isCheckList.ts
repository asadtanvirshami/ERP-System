  const checkList  = (e: any, data: any, setIsCheck:any, isCheck:any) => {
    const { checked } = e.target;
    setIsCheck([...isCheck, data.id]);
    if (!checked) {
      const unChecked = isCheck.filter((x:any) => x !== data.id);
      setIsCheck(unChecked);
    }
  };

  export {checkList}