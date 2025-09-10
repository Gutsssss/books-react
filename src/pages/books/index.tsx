import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { fetchBooks } from "../../entities/books/model/BookSlice";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { MyLoader } from "../../shared/ui/Loader";

export const BooksPage = () => {
  const dispatch = useAppDispatch();
  const { books,isLoading } = useAppSelector((state) => state.bookReducer);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  if(isLoading) {
    return <MyLoader/>
  }
  return (
    <>
      <Box sx={{padding:"20px"}}>
        <TableContainer variant="outlined" component={Paper}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell >Title</TableCell>
                <TableCell>Authors</TableCell>
                <TableCell>Publish date</TableCell>
                <TableCell>Categories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {books.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell sx={{maxWidth:'300px'}} component="th" scope="row">
                {row.volumeInfo.title}
              </TableCell>
              <TableCell >{row.volumeInfo.authors}</TableCell>
              <TableCell >{row.volumeInfo.publishedDate}</TableCell>
              <TableCell >{row.volumeInfo.categories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
