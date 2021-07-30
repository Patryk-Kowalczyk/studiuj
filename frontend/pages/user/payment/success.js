import { Box, Typography } from "@material-ui/core";
import React from "react";
import PanelLayout from "../../../layouts/Index";
import Image from "next/image";

function success() {
  return (
    <Box
      display="flex"
      width="100%"
      height="calc(100% - 64px)"
      flexDirection="column"
      placeItems="center"
    >
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        Płatność zakończona pomyślnie
      </Typography>
      <Image
        src="/images/success.svg"
        alt="Success image"
        width={400}
        height={500}
      />
    </Box>
  );
}

success.Layout = PanelLayout;
export default success;
