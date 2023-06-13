import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  Grid,
  TypographyProps,
  Skeleton,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userAPI from "../service/user-api";
import DetailLoading from "../components/DetailLoading";
import EditModal from "../components/EditModal";

const Subtitle = (props: TypographyProps) => (
  <Typography
    variant="subtitle1"
    sx={{ color: "rgba(0, 0, 0, 0.38) " }}
    {...props}
  />
);

const UserDetail = () => {
  const [user, setUser] = useState<User>();

  const [isLoading, setIsLoading] = useState(false);

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    fetchUser();
  }, [userId, isUpdated]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      if (userId) {
        const res = await userAPI.getDetail(userId);
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 1200, m: "auto", mt: 10, mb: 2 }}>
      <Stack gap={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          className="wrapper"
          p={2}
        >
          {isLoading ? (
            <Stack direction="row" gap={2} alignItems="center">
              <Skeleton variant="circular" height={64} width={64} />
              <Box>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={200} />
              </Box>
            </Stack>
          ) : (
            <>
              <Stack direction="row" gap={2} alignItems="center">
                <Avatar
                  src={user?.avatar}
                  alt={user?.firstName}
                  sx={{ height: 64, width: 64 }}
                />
                <Box>
                  <Typography variant="h5">{user?.firstName}</Typography>
                  <Typography variant="subtitle1">{user?.email}</Typography>
                </Box>
              </Stack>

              <Button
                variant="outlined"
                color="warning"
                size="large"
                sx={{ typography: (theme) => ({ ...theme.typography.body2 }) }}
                onClick={() => setIsOpenEditModal(true)}
              >
                Edit
              </Button>
            </>
          )}
        </Stack>

        <Box className="wrapper" p={2}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Employee Infomation
          </Typography>

          <Divider sx={{ mx: -2, my: 2 }} />

          <Grid container rowSpacing={4}>
            <Grid item xs={12} md={6}>
              <Stack justifyContent="center">
                <Subtitle>Full name</Subtitle>
                {isLoading ? (
                  <DetailLoading />
                ) : (
                  <Typography variant="h6">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack justifyContent="center">
                <Subtitle>Citizen Identification</Subtitle>
                {isLoading ? (
                  <DetailLoading />
                ) : (
                  <Typography variant="h6">{user?.citizenId}</Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack justifyContent="center">
                <Subtitle>Phone</Subtitle>
                {isLoading ? (
                  <DetailLoading />
                ) : (
                  <Typography variant="h6">{user?.phone}</Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack justifyContent="center">
                <Subtitle>Address</Subtitle>
                {isLoading ? (
                  <DetailLoading />
                ) : (
                  <Typography variant="h6">{user?.address}</Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack justifyContent="center">
                <Subtitle>Facebook</Subtitle>
                {isLoading ? (
                  <DetailLoading />
                ) : (
                  <Typography variant="h6">{user?.socialsFB}</Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack justifyContent="center">
                <Subtitle>Twitter</Subtitle>
                {isLoading ? (
                  <DetailLoading />
                ) : (
                  <Typography variant="h6">{user?.socialsTW}</Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>

      {user ? (
        <EditModal
          isOpen={isOpenEditModal}
          onClose={() => setIsOpenEditModal(false)}
          data={user}
          fetchDetail={() => setIsUpdated(!isUpdated)}
        />
      ) : null}
    </Box>
  );
};

export default UserDetail;
