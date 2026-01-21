import { Button, Menu, MenuItem, Box } from "@mui/material";
import { useState } from "react";

export default function SortControls({
  setSortBy,
  setSortOrder,
  setStatusFilter
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSort = field => {
    setSortBy(field);
    setSortOrder("asc");
    handleClose();
  };

  const handleStatus = status => {
    setStatusFilter(status);
    handleClose();
  };

  return (
    <Box mb={2}>
      <Button variant="contained" onClick={handleOpen}>
        Sort / Filter
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {/* SORT OPTIONS */}
        <MenuItem disabled>Sort By</MenuItem>
        <MenuItem onClick={() => handleSort("project")}>
          Project Name
        </MenuItem>
        <MenuItem onClick={() => handleSort("lastUpdated")}>
          Last Updated
        </MenuItem>

        <MenuItem divider />

        {/* STATUS FILTER */}
        <MenuItem disabled>Status</MenuItem>
        <MenuItem onClick={() => handleStatus("active")}>Active</MenuItem>
        <MenuItem onClick={() => handleStatus("inactive")}>Inactive</MenuItem>
        <MenuItem onClick={() => handleStatus("maintenance")}>
          Maintenance
        </MenuItem>

        <MenuItem divider />

        {/* CLEAR */}
        <MenuItem
          onClick={() => {
            setSortBy("");
            setStatusFilter("");
            handleClose();
          }}
        >
          Clear Filters
        </MenuItem>
      </Menu>
    </Box>
  );
}
