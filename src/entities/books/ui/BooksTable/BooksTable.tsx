import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { MyLoader } from "../../../../shared/ui/Loader"
import type { IBook } from "../../types"
import { BooksTableRow } from "../BooksTableRow/BooksTableRow";
interface BooksTableProps {
  books: IBook[];
  loading: boolean;
}

export const BooksTable = ({books,loading}:BooksTableProps) => {
    return (
        <>
        <TableContainer variant="outlined" component={Paper}>
          {!loading ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Actions</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Authors</TableCell>
                  <TableCell>Publish date</TableCell>
                  <TableCell>Categories</TableCell>
                </TableRow>
              </TableHead>
               <TableBody>
            {books?.map((book, index) => (
              <BooksTableRow key={`${book.id}${index}`} book={book} index={index} />
            ))}
          </TableBody>
            </Table>
          ) : (
            <MyLoader />
          )}
        </TableContainer>
        </>
    )
}