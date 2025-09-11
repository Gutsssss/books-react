import { Menu, MenuItem } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { getCurrentBook } from "../../../entities/books/model/BookSlice";

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
     const handleOpenBook = () => {
    dispatch(getCurrentBook(bookId)); // Загружаем и открываем книгу
    closeMenu();
  };
  return (
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
      <MenuItem onClick={closeMenu}>Edit</MenuItem>
    </Menu>
  );
};