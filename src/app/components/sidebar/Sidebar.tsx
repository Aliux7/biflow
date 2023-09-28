import React from "react";
import "./sidebar.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Sidebar = () => {
  return (
    <nav className="sidebar">
        <div>
            <a href="/" className="brand menu-heading">
                <span>Categories</span>
            </a>
            {/* <hr /> */}
            <FormControl className="tools">
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="female" control={<Radio />} label="All" className="sidebarItem"/>
                <FormControlLabel value="male" control={<Radio />} label="Single Flower" className="sidebarItem"/>
                <FormControlLabel value="other" control={<Radio />} label="Bucket" className="sidebarItem"/>
            </RadioGroup>
            </FormControl>
        </div>

    </nav>
  );
};

export default Sidebar;
