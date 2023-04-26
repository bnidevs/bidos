import React from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

const DropdownButton = ({ value, onChangeHandler }) => {
  const items = ["Submitty", "EazyASM", "OpenCircuits"];

  return (
    <FormControl variant="standard" style={{ marginBottom: 30 }}>
      <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
        Projects
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Projects"
        onChange={(e) => onChangeHandler(e.target.value)}
        style={{ borderColor: "blue", color: "white" }}
      >
        {items.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DropdownButton;
