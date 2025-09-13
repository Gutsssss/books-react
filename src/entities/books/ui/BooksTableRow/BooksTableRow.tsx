// BooksTableRow.tsx
import { TableRow, TableCell, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { IBook } from "../../types";
import { useState } from "react";
import { ActionMenu } from "../../../../shared/ui/Menu/ActionMenu";

interface BooksTableRowProps {
  book: IBook;
  index: number;
}

export const BooksTableRow = ({ book, index }: BooksTableRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const normalizeAuthors = book?.volumeInfo.authors?.join(', ')
  const normalizeCategory = book?.volumeInfo.categories?.join(', ')
  return (
    <>
      <TableRow key={`${book.id}${index}`}>
        <TableCell>
          <IconButton
            id={`action-button-${index}`}
            aria-controls={open ? `action-menu-${index}` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon/>
          </IconButton>
        </TableCell>
        <TableCell sx={{ maxWidth: "300px",wordBreak:'break-all' }} scope="row">
          {book.volumeInfo.title}
        </TableCell>
        <TableCell sx={{ maxWidth: "300px" }}>{normalizeAuthors}</TableCell>
        <TableCell>{book.volumeInfo.publishedDate}</TableCell>
        <TableCell>{normalizeCategory}</TableCell>
      </TableRow>
      
      <ActionMenu 
        anchorEl={anchorEl} 
        closeMenu={handleClose} 
        openFlag={open}
        menuId={`action-menu-${index}`}
        bookId={book.id}
      />
    </>
  );
};