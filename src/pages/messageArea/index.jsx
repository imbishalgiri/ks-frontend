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
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4250af",
    color: theme.palette.common.white,
    minWidth: "100px",
    maxWidth: "400px",
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
const MessageArea = () => {
  const [file, setFile] = useState(null);

  const [userLoading, setUserLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit: handleEditSubmission,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user.role !== "nsu") navigate("/");
  });

  useEffect(() => {
    setUserLoading(true);
    AxiosInstance.get(`/user-message?page=${page}&limit=${limit}`)
      .then((res) => {
        setAllUsers(res?.data?.data);
        setTotalUsers(res?.data?.totalMessages);
        setUserLoading(false);
      })
      .catch((err) => {
        setUserLoading(false);
        toast.error("error getting user");
      });
  }, [refresh, page, limit]);

  const handleDeleteUser = async (userId) => {
    if (
      await confirm({
        title: "Delete User",
        message: "Are you sure you wanna do this?",
      })
    ) {
      const promise = new Promise((resolve, reject) =>
        AxiosInstance.delete("user-message/" + userId)
          .then((data) => {
            resolve("done");
            setRefresh(!refresh);
          })
          .catch((err) => {
            reject("err");
          })
      );

      toast.promise(promise, {
        pending: "Deleting...",
        success: "Deleted.",
        error: "could not delete",
      });
    }
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
        <div style={{ width: "90vw", marginTop: "100px" }} className="table">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SN.</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell>Subject</StyledTableCell>
                  <StyledTableCell>Message</StyledTableCell>
                  <StyledTableCell>Received at</StyledTableCell>
                  <StyledTableCell>actions</StyledTableCell>
                </TableRow>
              </TableHead>
              {!userLoading && (
                <TableBody>
                  {allUsers?.map((row, idx) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell>
                        {page * limit + 1 + idx}
                      </StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.phoneNumber}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <div style={{ width: "300px" }}>{row.subject}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div style={{ width: "400px" }}>
                          {row.message || "-"}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div style={{ width: "100px" }}>
                          {moment(row?.createdAt).format(
                            "dddd, MMMM Do YYYY, h:mm:ss a"
                          ) || "-"}
                        </div>
                      </StyledTableCell>

                      <StyledTableCell>
                        <IconButton onClick={() => handleDeleteUser(row._id)}>
                          <FaTrash style={{ color: "red", fontSize: "20px" }} />
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
    </>
  );
};

export default MessageArea;
