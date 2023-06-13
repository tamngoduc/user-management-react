import {
  Box,
  Modal,
  Stack,
  Typography,
  IconButton,
  Divider,
  TextField,
  FormHelperText,
  Button,
  Avatar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useRef, useState } from "react";
import userAPI from "../service/user-api";
import { useSnackbar } from "notistack";

interface InputSate {
  title: string;
  errorMessage?: string;
  property: UserProperties;
  required?: boolean;
}

const inputList: InputSate[] = [
  {
    title: "First Name",
    required: true,
    errorMessage: "First Name must be provided!",
    property: "firstName",
  },
  {
    title: "Last Name",
    required: true,

    errorMessage: "Last Name must be provided!",
    property: "lastName",
  },
  {
    title: "Citizen Identification",
    required: true,

    errorMessage: "Citizen Identification must be provided!",
    property: "citizenId",
  },
  {
    title: "Phone",
    required: true,
    errorMessage: "Phone must be provided!",
    property: "phone",
  },
  {
    title: "Address",
    required: true,
    errorMessage: "Address must be provided!",
    property: "address",
  },
  {
    title: "Email",
    required: true,
    errorMessage: "Email must be provided!",
    property: "email",
  },
  {
    title: "Facebook",
    property: "socialsFB",
  },
  {
    title: "Twitter",
    property: "socialsTW",
  },
];

const EditModal = ({
  isOpen,
  onClose,
  data,
  fetchDetail,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: User;
  fetchDetail: () => void;
}) => {
  const [isSending, setIsSending] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control } = useForm<UserState>({
    defaultValues: data || {
      firstName: "",
      lastName: "",
      citizenId: "",
      address: "",
      phone: "",
      avatar: "",
      email: "",
      socialsFB: "",
      socialsTW: "",
    },
    mode: "onTouched",
  });

  const imgInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<{
    data: File | null;
    url: string;
  }>({
    data: null,
    url: "",
  });

  const handleButtonClick = () => {
    imgInputRef.current?.click();
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.toString();
        resolve(base64String || "");
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const base64Url = await convertToBase64(file);
      setSelectedImage({ data: file, url: base64Url });
    }
    if (imgInputRef.current) imgInputRef.current.value = "";
  };

  const onSubmit = async (formData: UserState) => {
    setIsSending(true);
    try {
      if (selectedImage && selectedImage.data) {
        formData.avatar = selectedImage.url;
      }
      await userAPI.updateUser(data.id, formData);
      enqueueSnackbar("Update successfully!", { variant: "success" });
      onClose();
      fetchDetail();
    } catch (error) {
      enqueueSnackbar("There are some errors, please try again!", {
        variant: "error",
      });
    }
    setIsSending(false);
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isSending ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSending}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box
          className="wrapper"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
            p: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" fontWeight={700}>
              Edit Employee Information
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mx: -1 }} />

          <Box m={2} sx={{ overflowY: "auto", maxHeight: "80vh" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="avatar"
                rules={{
                  required: {
                    value: true,
                    message: "Avatar must be provided!",
                  },
                }}
                render={({ fieldState: { error } }) => (
                  <>
                    <Stack direction="row" gap={2} alignItems="center">
                      <Avatar
                        src={selectedImage?.url || data.avatar}
                        alt={data.firstName}
                        sx={{ height: 80, width: 80 }}
                      />

                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "initial", height: 30 }}
                        onClick={handleButtonClick}
                      >
                        Change avatar
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={imgInputRef}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </Stack>
                    {error?.message && (
                      <FormHelperText error>{error.message}</FormHelperText>
                    )}
                  </>
                )}
              />
              <Stack gap={2} mt={2}>
                {inputList.map((input) => (
                  <Box key={input.property}>
                    <Typography variant="body2">{input.title}</Typography>
                    <Controller
                      control={control}
                      name={input.property}
                      rules={{
                        required: {
                          value: input.required || false,
                          message: input.errorMessage || "",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <TextField
                            fullWidth
                            value={value}
                            onChange={onChange}
                            size="small"
                            error={!!error}
                          />
                          {error?.message && (
                            <FormHelperText error>
                              {error.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    />
                  </Box>
                ))}
              </Stack>
              <Stack direction="row" justifyContent="end" gap={2} mt={2}>
                <Button type="submit" variant="contained" disabled={isSending}>
                  Update
                </Button>
                <Button variant="contained" color="error" onClick={onClose}>
                  Cancel
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default EditModal;
