import { Box, Typography } from "@material-ui/core";
import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Image from "next/image";

function failed() {
  return (
    <Box
      display="flex"
      width="100%"
      height="calc(100% - 64px)"
      flexDirection="column"
      placeItems="center"
    >
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        Nie udało się dokończyć płatności
      </Typography>
      <Image src="/images/fail.svg" alt="Fail image" width={400} height={500} />
    </Box>
  );
}

failed.Layout = DashboardLayout;
export default failed;
