import React from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

const DropdownButton = () => {
  return (
    <FormControl style={{ marginBottom: 30 }}>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={10}
        label="Projects"
        onChange={() => console.log("Projects")}
      >
        <MenuItem value={10}>Submitty</MenuItem>
        <MenuItem value={20}>EazyASM</MenuItem>
        <MenuItem value={30}>OpenCircuits</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropdownButton;
