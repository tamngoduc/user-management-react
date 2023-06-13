import { Box, Stack } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import HeaderBox from "../components/HeaderBox";

const MainTemplate = () => {
  const storedEmail = localStorage.getItem("email");

  const storedPassword = localStorage.getItem("password");

  return (
    <>
      {storedEmail && storedPassword ? (
        <Box sx={{ backgroundColor: "#f1f1f1", minHeight: "100vh", p: 2 }}>
          <Stack direction="row" justifyContent="end">
            <HeaderBox />
          </Stack>
          <Outlet />
        </Box>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default MainTemplate;
