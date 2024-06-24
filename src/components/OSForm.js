// src/components/OSForm.js
import React, { useState } from "react";
import { createOS } from "../services/api";

const OSForm = () => {
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOS({ name, version });
      console.log("OS Created:", response.data);
    } catch (error) {
      console.error("Error creating OS:", error);
    }
  };

  return (
    <div>
      <h2>Create OS</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Version:</label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default OSForm;
