import { Box, Typography, Popover, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderBox = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        component="button"
        onClick={handleClick}
        className="wrapper"
        sx={{
          px: 5,
          py: 2,
          my: 2,
          mr: 4,
          textAlign: "center",
          border: "none",
          "&:hover": { cursor: "pointer" },
        }}
      >
        <Typography variant="button" color="primary">
          ADMIN
        </Typography>
        <Typography variant="body2">Nguyen Van A</Typography>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: 1 }}
      >
        <Button
          onClick={() => {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            navigate("/login", { replace: true });
          }}
        >
          Logout
        </Button>
      </Popover>
    </>
  );
};

export default HeaderBox;
