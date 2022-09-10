import {
  Button,
  CircularProgress,
  IconButton,
  TableFooter,
  TablePagination,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { FaPen, FaPenAlt, FaPlusCircle, FaTrash } from "react-icons/fa";
import Appbar from "../../components/appbar";
import CustomModal from "../../components/common/modal";
import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AxiosInstance from "../../apis/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { confirm } from "mui-confirm-modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNotice from "./addNotice";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4250af",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// ACTUAL COMPONENT
const AdminArea = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [addNoticeOpen, setAddNoticeOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [noticeSubmissionLoading, setNoticeSubmissionLoading] = useState(false);
  const [noticeData, setNoticeData] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit: handleEditSubmission,
    watch,
    formState: { errors },
  } = useForm();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (user.role !== "admin") navigate("/");
  });

  useEffect(() => {
    setUserLoading(true);
    AxiosInstance.get(`/users?page=${page}&limit=${limit}`)
      .then((res) => {
        setAllUsers(res?.data?.data);
        setTotalUsers(res?.data?.totalUsers);
        setUserLoading(false);
      })
      .catch((err) => {
        setUserLoading(false);
        toast.error("error getting user");
      });
  }, [refresh, page, limit]);

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("users", file);
    AxiosInstance.post("/users/upload-users", formData)
      .then((res) => {
        toast.success("successfully uploaded user");
        console.log(res.data);
        setLoading(false);
        handleClose();
        setRefresh(!refresh);
      })
      .catch((err) => {
        setLoading(false);
        setRefresh(!refresh);
        toast.info("could not upload all.");
        handleClose();
      });
  };

  const handleEditSubmit = (data) => {
    setEditLoading(true);
    AxiosInstance.put("/users/update", { ...data, _id: editOpen?._id })
      .then((res) => {
        toast.success("successfully edited user");
        setEditLoading(false);
        setEditOpen(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        setEditLoading(false);
        toast.error("error editing user");
      });
  };

  const handleDeleteUser = async (userId) => {
    if (
      await confirm({
        title: "Delete User",
        message: "Are you sure you wanna do this?",
      })
    ) {
      const promise = new Promise((resolve, reject) =>
        AxiosInstance.delete("users/" + userId)
          .then((data) => {
            handleClose();
            resolve("done");
            setRefresh(!refresh);
          })
          .catch((err) => {
            handleClose();
            reject("err");
          })
      );

      toast.promise(promise, {
        pending: "Deleting...",
        success: "Deleted.",
        error: "could not delete",
      });
    } else {
      handleClose();
    }
  };

  const noticeSubmit = (data) => {
    setNoticeSubmissionLoading(true);
    const formData = new FormData();
    formData.append("image", noticeData?.image);
    formData.append("description", noticeData?.description);
    formData.append("audience", noticeData?.audience);
    AxiosInstance.post("/notice", formData)
      .then((res) => {
        toast.success("successfully posted notice");
        setNoticeSubmissionLoading(false);
        handleClose();
      })
      .catch((err) => {
        setNoticeSubmissionLoading(false);
        toast.error("error adding notice");
      });
  };

  const handleNoticeOpen = () => {
    setAddNoticeOpen(true);
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  const classes = useStyles();

  return (
    <>
      <Appbar />
      <div
        style={{
          marginTop: "100px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "1400px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaPlusCircle />}
            style={{ textTransform: "none", marginRight: "20px" }}
            onClick={handleNoticeOpen}
          >
            Add Notice
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaPlusCircle />}
            style={{ textTransform: "none" }}
            onClick={handleOpen}
          >
            Add Users
          </Button>
        </div>

        <div style={{ width: "90vw", marginTop: "100px" }} className="table">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SN.</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Faculty</StyledTableCell>
                  <StyledTableCell>Semester</StyledTableCell>
                  <StyledTableCell>actions</StyledTableCell>
                </TableRow>
              </TableHead>
              {!userLoading && (
                <TableBody>
                  {allUsers?.map((row, idx) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell>{idx + 1}</StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.firstName}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.lastName}
                      </StyledTableCell>
                      <StyledTableCell>{row.faculty || "-"}</StyledTableCell>
                      <StyledTableCell>{row.semester || "-"}</StyledTableCell>

                      <StyledTableCell>
                        <IconButton onClick={() => handleDeleteUser(row._id)}>
                          <FaTrash style={{ color: "red", fontSize: "20px" }} />
                        </IconButton>
                        <IconButton onClick={() => setEditOpen(row)}>
                          <FaPen
                            style={{ color: "yellowgreen", fontSize: "20px" }}
                          />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
              {userLoading && (
                <TableCell
                  style={{ padding: "300px" }}
                  align="center"
                  colSpan={8}
                >
                  <CircularProgress />
                </TableCell>
              )}

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    rowsPerPage={limit}
                    count={totalUsers}
                    page={page}
                    // SelectProps={{
                    //   inputProps: { "aria-label": "rows per page" },
                    //   native: true,
                    // }}
                    onPageChange={(e, p) => setPage(p)}
                    onRowsPerPageChange={(e) => setLimit(e.target.value)}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>

      <CustomModal
        headerText={"Add users from here."}
        height={"50vh"}
        open={open}
        handleClose={handleClose}
        onSave={handleSubmit}
        disabled={!file}
        isLoading={loading}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input type={"file"} accept={".xlsx"} onChange={handleFileChange} />
        </div>
      </CustomModal>

      <CustomModal
        headerText={"Edit users from here."}
        height={"50vh"}
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        onSave={handleEditSubmission(handleEditSubmit)}
        isLoading={editLoading}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <TextField
            style={{ margin: "20px" }}
            label="email"
            name="email"
            variant="outlined"
            defaultValue={editOpen?.email}
            inputRef={register}
          />
          <TextField
            style={{ margin: "20px" }}
            label="first name"
            name="firstName"
            variant="outlined"
            defaultValue={editOpen?.firstName}
            inputRef={register}
          />
          <TextField
            style={{ margin: "20px" }}
            label="last name"
            name="lastName"
            variant="outlined"
            defaultValue={editOpen?.lastName}
            inputRef={register}
          />
          <TextField
            style={{ margin: "20px" }}
            label="faculty"
            name="faculty"
            variant="outlined"
            defaultValue={editOpen?.faculty}
            inputRef={register}
          />
          <TextField
            type="number"
            style={{ margin: "20px" }}
            label="semester"
            name="semester"
            variant="outlined"
            defaultValue={editOpen?.semester}
            inputRef={register}
          />
        </div>
      </CustomModal>
      <CustomModal
        headerText={"Add notice from here."}
        height={"70vh"}
        open={addNoticeOpen}
        handleClose={() => setAddNoticeOpen(false)}
        onSave={noticeSubmit}
        disabled={
          !noticeData?.image ||
          !noticeData?.description ||
          !noticeData?.audience
        }
        isLoading={noticeSubmissionLoading}
      >
        <AddNotice parentSubmit={(e) => setNoticeData(e)} />
      </CustomModal>
    </>
  );
};

export default AdminArea;
