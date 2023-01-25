import React from "react";
import { Oval } from "react-loader-spinner";
import Box from "@mui/material/Box";

const Spinner: React.FC<{show: Boolean}> = ({ show }) => {
  return show ? (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
      }}
    >
      <Oval
        height={100}
        width={100}
        strokeWidth={5}
        strokeWidthSecondary={2000}
        color="#fd558f"
      />
    </Box>
  ) : null;
};

export default Spinner;
