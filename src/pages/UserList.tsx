import { useEffect, useState } from "react";
import userAPI from "../service/user-api";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserList = () => {
  const [userList, setUserList] = useState<User[]>();

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    setIsLoading(true);
    try {
      const res = await userAPI.getList();
      setUserList(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const itemsPerPage = 20;

  const totalPages = Math.ceil((userList?.length || 0) / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = Math.min(
    currentPage * itemsPerPage,
    userList ? userList.length : 0
  );

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentUserList = userList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Box
        className="wrapper"
        sx={{
          p: 2,
          maxWidth: 1200,
          m: "auto",
          mt: 10,
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Employees List
        </Typography>

        <Divider sx={{ mx: -2, my: 2 }} />

        <Grid container rowSpacing={2} sx={{ position: "relative" }}>
          {isLoading ? (
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                my: 3,
                backgroundColor: "white",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress size={64} disableShrink thickness={3} />
            </Stack>
          ) : (
            <>
              {currentUserList?.map((user) => (
                <Grid item md={3} sm={4} xs={6} key={user.id}>
                  <Link to={user.id}>
                    <Stack
                      direction="row"
                      gap={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "#0000001F",
                        },
                        overflowX: "hidden",
                      }}
                    >
                      <Avatar src={user.avatar} alt={user.firstName} />
                      <Stack>
                        <Typography variant="body2">
                          {user.firstName}
                        </Typography>
                        <Typography variant="caption">{user.email}</Typography>
                      </Stack>
                    </Stack>
                  </Link>
                </Grid>
              ))}
            </>
          )}
        </Grid>
        <Stack direction="row" justifyContent="end" mt={3}>
          <Pagination
            count={totalPages || 1}
            page={currentPage}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Box>
    </>
  );
};

export default UserList;
