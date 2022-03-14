import React from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Dialog } from "@mui/material";

export default function Loading({ loading }) {
  return (
    <div>
      <Dialog open={loading}>
        <Box sx={{ overflow: "hidden", backgroundColor: "transparent" }}>
          <CircularProgress size={100} />
        </Box>
      </Dialog>
    </div>
  );
}

Loading.prototype = {
  loading: PropTypes.bool,
};
