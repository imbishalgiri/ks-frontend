import { makeStyles } from "@material-ui/core";

const usestyles = makeStyles(() => ({
  root: {
    background: "#ddd",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: "24",
    p: "4",
  },
  modalHeader: {
    background: "#4250af",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem 2.5rem 2rem 3.8rem",
    height: "4.2rem",
    color: "#fff",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.18)",
  },
  modalHeaderText: {
    color: "#fff",
    // fontFamily: "Euclid",
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  cancelItem: {
    cursor: "pointer",
  },
  modalBody: {
    padding: "2rem 2.5rem 2rem 3.8rem",
    overflow: "scroll",
  },
  modalFooter: {
    width: "30vw",
    marginTop: "auto",
    marginLeft: "auto",

    // background: "#fff",
    display: "flex",
    justifyContent: "flex-end",
    // padding: "1rem 3rem",
    height: "4.9rem",
  },
  modalFooterButtons: {
    // fontFamily: "Euclid",
    ":&>*": {
      margin: "0 1rem",
      background: "#4250af",
    },
  },
  modalFooterCancel: {
    marginLeft: "10px",
    background: "#4250af",
    color: "#fff",
    "&:hover": {
      background: "#ddd",
    },
  },
  modalFooterBtn: {
    background: "#4250af",
    color: "#fff",
  },
  crossIcon: {
    "&>path": {
      stroke: "#fff",
    },
  },
}));

export default usestyles;
