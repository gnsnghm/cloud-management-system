// src/components/UnitForm.js
import React, { useState } from "react";
import { createUnit } from "../services/api";

const UnitForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUnit({ name });
      console.log("Unit Created:", response.data);
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  };

  return (
    <div>
      <h2>Create Unit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default UnitForm;
