import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { fetchBooks, loadMore } from "../../entities/books/model/BookSlice";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { MyLoader } from "../../shared/ui/Loader";

export const BooksPage = () => {
  const dispatch = useAppDispatch();
  const { books,isLoading } = useAppSelector((state) => state.bookReducer);
  const [searchParam,setSearchParam] = useState('book')
  useEffect(() => {
    dispatch(fetchBooks('books'));
  }, [dispatch]);
  const loadMoreBooks =() => {
    try {
      dispatch(loadMore('books')) 
    } catch (error) {
      console.log(error)
    }
  }
  if(isLoading) {
    return <MyLoader/>
  }
  return (
    <>
      <Box sx={{padding:"20px"}}>
        <TextField fullWidth variant="outlined" label='Поиск' sx={{marginY:"10px"}}/>
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
          {books.map((book,index) => (
            <TableRow
              key={`${book.id}${index}`}
            >
              <TableCell sx={{maxWidth:'300px'}} component="th" scope="row">
                {book.volumeInfo.title}
              </TableCell>
              <TableCell >{book.volumeInfo.authors}</TableCell>
              <TableCell >{book.volumeInfo.publishedDate}</TableCell>
              <TableCell >{book.volumeInfo.categories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={loadMoreBooks}>Загрузить больше</Button>
      </Box>
    </>
  );
};
