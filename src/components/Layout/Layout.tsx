import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../Header/Header";
import Spinner from "../../shared/components/Spinner/Spinner";
import Toaster from "../../shared/components/Toaster/Toaster";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AlertDialog from "../../shared/components/AlertDialog/AlertDialog";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  const {
    toasterVisible,
    toasterMessage,
    toasterStatus,
    isLoading,
    alertMessage,
    isAlertOpen,
    alertTitle,
  } = useSelector((s: RootState) => s.layout);

  return (
    <>
      <Header />
      <Offset />
      <Box>{children}</Box>
      <Toaster
        show={toasterVisible}
        message={toasterMessage}
        status={toasterStatus}
      />
      <Spinner show={isLoading} />
      <AlertDialog
        message={alertMessage}
        title={alertTitle}
        onOpen={isAlertOpen}
      />
    </>
  );
};

export default Layout;
