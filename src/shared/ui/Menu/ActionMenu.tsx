import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, TextField } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { getCurrentBook, updateBookTitle } from "../../../entities/books/model/BookSlice";
import { useState } from "react";

interface ActionMenuProps {
  anchorEl: null | HTMLElement;
  closeMenu: () => void;
  openFlag: boolean;
  menuId?: string;
  bookId:string
}

export const ActionMenu = ({ 
  anchorEl, 
  closeMenu, 
  openFlag, 
  menuId = "basic-menu",
  bookId
}: ActionMenuProps) => {
    const dispatch = useAppDispatch()
    const [newTitle,setNewTitle] = useState('')
    const [editDialogOpen, setEditDialogOpen] = useState(false);
     const handleOpenBook = () => {
    dispatch(getCurrentBook(bookId));
    closeMenu();
  };
  const handleEditClick = () => {
    setEditDialogOpen(true);
    closeMenu();
  };
  const handleSaveTitle = () => {
    if (newTitle.trim()) {
      dispatch(updateBookTitle({ id: bookId, newTitle }));
      setEditDialogOpen(false);
      setNewTitle('');
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setNewTitle('');
  };
  return (
    <>
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      open={openFlag}
      onClose={closeMenu}
      slotProps={{
        list: {
          "aria-labelledby": "basic-button",
        },
      }}
    >
      <MenuItem onClick={handleOpenBook}>Open</MenuItem>
      <MenuItem onClick={handleEditClick}>Edit</MenuItem>
    </Menu>
    <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Book Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Title"
            fullWidth
            variant="outlined"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveTitle}>Save</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};
