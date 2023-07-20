import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TablePagination from '../../shared/Table/TablePagination';
import Modal from '../../shared/Modal';
import debounce from 'lodash.debounce';


const TaskAssigningPage = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of users to show per page
  const [showModal, setShowModal] = React.useState<boolean>(false);

  useEffect(() => {
     fetchUsers()

  }, []);

  // const handleScrollDebounced = () => {
  //   // Debounce the API call using setTimeout
  //   if (!isFetching) {
  //     isFetching = true;
  //     setTimeout(() => {
  //       fetchUsers();
  //       isFetching = false;
  //     }, 500); // Adjust the debounce delay as needed (e.g., 500ms)
  //   }
  // };
  
  const fetchUsers = async () => {
    try {

      const response = await axios.get(process.env.NEXT_PUBLIC_ERP_GET_AGENTS as string,{
        headers:{
            id:'ea3782b0-9635-4dd8-ba59-7ac5b8c74ef2',
            page:currentPage,
            limit:pageSize

        }
      });
      const newUsers = users.concat(response.data.payload);
      setUsers(newUsers);
      setTotalUsers(response.data.totalItems);
      console.log(response.data.payload)
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const handlePageChange = useCallback((pageNumber:number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleScroll = debounce(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200 && users.length < totalUsers ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, 500); // Adjust the debounce delay as needed (e.g., 200ms)
  
  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [users.length, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <div style={{height:100}}>
        <button onClick={()=>setShowModal(true)}>sss</button>
    <Modal         label={'te'}
        showModal={showModal}
        modalSize="sm"
        setShowModal={setShowModal}
        onScroll={handleScroll}
        viewTable={true}>
      <h1>Task Assigning Page</h1>
      <div>
        <h2>Users:</h2>
        <ul>
          {users.map((user:any, index) => (
            <li key={user.id}>{index+1} {user.name}</li>
          ))}
        </ul>
        {users.length < totalUsers && <p>Loading more users...</p>}
      </div>
      </Modal>

    </div>
  );
};

export default TaskAssigningPage;
