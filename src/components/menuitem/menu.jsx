// import react, { useState, useEffect, useRef } from "react";
// import { MoreVert, Edit, Delete, Reply } from "@material-ui/icons";
// import {
//   Box,
//   MenuList,
//   MenuItem,
//   ClickAwayListener,
//   Popper,
//   Grow,
//   IconButton,
// } from "@material-ui/core";

// // import Protected from "../../auth/protected";
// // import DeleteDialog from "../../attendance/common/DeleteDialog";

// const ActionList = ({
//   userId,
//   commentId,
//   setReply = () => {},
//   fetchAgain,
//   setEdit = false,
//   actions = ["reply", "delete", "edit"],
//   deleteComment,
// }) => {
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [open, setOpen] = useState(false);
//   const anchorRef = useRef();

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const handleEdit = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//     setEdit(true);
//   };

//   const handleReply = () => {
//     setReply(true);
//   };

//   const handleDelete = () => {
//     setDeleteModal(true);
//   };

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   // this will render menu item based on the array
//   // array format supported = ['reply', 'edit', 'delete']
//   // pass this array in props
//   const renderMenuItem = (array) => {
//     const menuItemStyle = {
//       zIndex: "100",
//       display: "flex",
//       justifyContent: "space-between",
//     };
//     const iconStyle = {
//       marginLeft: "10px",
//       // marginTop: "-50px",
//       width: "20px",
//       height: "20px",
//     };

//     const items = {
//       reply: {
//         method: handleReply,
//         icon: <Reply style={iconStyle} />,
//       },
//       delete: { method: handleDelete, icon: <Delete style={iconStyle} /> },
//       edit: { method: handleEdit, icon: <Edit style={iconStyle} /> },
//     };

//     return array.map((el) => {
//       if (el.toLowerCase() !== "reply")
//         return (
//           <Protected
//             component={() => (
//               <MenuItem
//                 style={menuItemStyle}
//                 onClick={items[el.toLowerCase()].method}
//               >
//                 {el.toLowerCase()}
//                 {items[el.toLowerCase()].icon}
//               </MenuItem>
//             )}
//             idFromServer={userId}
//           />
//         );
//       return (
//         <MenuItem
//           style={menuItemStyle}
//           onClick={items[el.toLowerCase()].method}
//         >
//           {el.toLowerCase()}
//           {items[el.toLowerCase()].icon}
//         </MenuItem>
//       );
//     });
//   };

//   return (
//     <Box>
//       <IconButton
//         zIndex="100"
//         style={{ zIndex: "50", margin: "-5px 0 0 0" }}
//         id="composition-button"
//         ref={anchorRef}
//         aria-controls={open ? "composition-menu" : undefined}
//         aria-expanded={open ? "true" : undefined}
//         aria-haspopup="true"
//         onClick={handleToggle}
//       >
//         <MoreVert />
//       </IconButton>
//       <Popper
//         anchorEl={anchorRef.current}
//         open={open}
//         role={undefined}
//         transition
//         disablePortal
//       >
//         {({ TransitionProps, placement }) => (
//           <Grow
//             {...TransitionProps}
//             style={{
//               transformOrigin:
//                 placement === "bottom-start" ? "left top" : "left bottom",
//             }}
//           >
//             <div
//               style={{
//                 boxShadow: "0px 0px 2px 2px  #ddd",
//                 background: "#fff",
//                 zIndex: "3000",
//               }}
//             >
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MenuList
//                   autoFocusItem={open}
//                   id="composition-menu"
//                   aria-labelledby="composition-button"
//                   style={{ zIndex: "100" }}
//                 >
//                   {renderMenuItem(actions)}
//                 </MenuList>
//               </ClickAwayListener>
//             </div>
//           </Grow>
//         )}
//       </Popper>

//       {deleteModal && (
//         <DeleteDialog
//           title="Delete Comment"
//           dialogTitle="Are you sure to delete this comment."
//           onClose={setDeleteModal}
//           open={deleteModal}
//           onConfirm={() => deleteComment(commentId, setDeleteModal, fetchAgain)}
//         />
//       )}
//     </Box>
//   );
// };

// export default ActionList;
