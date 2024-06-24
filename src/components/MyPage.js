// src/components/MyPage.js
import React from "react";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <div>
      <h2>My Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/cloud-provider">Cloud Provider</Link>
          </li>
          <li>
            <Link to="/data-center">Data Center</Link>
          </li>
          <li>
            <Link to="/cloud-pool">Cloud Pool</Link>
          </li>
          <li>
            <Link to="/virtual-machine">Virtual Machine</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/unit">Unit</Link>
          </li>
          <li>
            <Link to="/storage">Storage</Link>
          </li>
          <li>
            <Link to="/os">OS</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MyPage;
