import React from "react";
import {
  Button,
  Modal,
  Box,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "./styles";

import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
import LoadingButton from "../loadingButton";

const CustomModal = ({
  headerText,
  open,
  handleClose,
  children,
  width,
  height,
  onSave,
  disabled,
  isLoading = false,
}) => {
  const classes = useStyles();

  const customModalStyles = {
    width: width || "74.4rem",
    height: height || "34.1rem",
    display: "flex",
    flexDirection: "column",
    background: "#F9F9FB",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...customModalStyles }} className={classes.root}>
        <Box className={classes.modalHeader}>
          <Box className={classes.modalHeaderText}>{headerText}</Box>
          <IconButton color="#fff">
            <GrClose onClick={handleClose} className={classes.crossIcon} />
          </IconButton>
        </Box>
        <Box className={classes.modalBody}>{children}</Box>

        <Box className={classes.modalFooter}>
          <Box className={classes.modalFooterButtons}>
            {!isLoading ? (
              <Button
                className={classes.modalFooterBtn}
                variant={"contained"}
                disabled={disabled}
                onClick={onSave}
              >
                Save
              </Button>
            ) : (
              <CircularProgress size={"2rem"} />
            )}

            {!isLoading && (
              <Button
                className={classes.modalFooterCancel}
                sx={{ background: "#fff", color: "#000" }}
                variant={"contained"}
                onClick={handleClose}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;

CustomModal.propTypes = {
  headerText: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.element,
  width: PropTypes.string,
  height: PropTypes.string,
};

CustomModal.defaultProps = {
  headerText: "This is a default header",
};
