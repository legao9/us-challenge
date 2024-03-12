import React, { useState, useEffect } from "react";
import "./User.css";
import List from "../../components/List/List";
import { apiUrl } from "../../utils/Constants";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl+"auth/all-users");
        // console.log(response.json())
        const jsonData = await response.json();
  
        setAllUsers(jsonData);
   
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user dashboard">
      <table>
        <thead> 
        <tr className="tableHead">Name</tr>
        <tr className="tableHead">Email</tr>
        <tr className="tableHead">Role</tr>
        <tr className="tableHead">Address</tr>
        <tr className="tableHead">Phone</tr>
        </thead>
        <tbody>
        {/* Mapping the  array of users */}
        {allUsers.map((user) => {            
          return (
            <div className="Table-row">
              <tr className="tableRow">
               {user.first_name + user.last_name}
              </tr>
              <tr className="tableRow">{user.email}</tr>
              <tr className="tableRow">{user.role_type}</tr>
              <tr className="tableRow">{user.address}</tr>
              <tr className="tableRow">{user.phone}</tr>
              </div>

          );
        })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

