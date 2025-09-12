import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { closeDialog, fetchBooks, loadMore } from "../../entities/books/model/BookSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { BooksTable } from "../../entities/books/ui/BooksTable/BooksTable";
import { useDebounce } from "../../shared/hooks/useDebounce";
export const BooksPage = () => {
  const dispatch = useAppDispatch();
  const load = useRef(null)
  const { books, isLoading, moreBooksLoading, currentBook, isDialogOpen } = useAppSelector(
    (state) => state.bookReducer
  );
  const [searchParam, setSearchParam] = useState("");
  const debounceSearch = useDebounce(searchParam, 500)

  useEffect(() => {
    if (!debounceSearch.trim()) {
      dispatch(fetchBooks("books"));
    }
    else {
      dispatch(fetchBooks(debounceSearch))
    }
    console.log(load.current)
  }, [dispatch, debounceSearch,load]);
  const loadMoreBooks = () => {
    try {
      if (!debounceSearch.trim()) {
        dispatch(loadMore("books"));
      }
      else {
        dispatch(loadMore(debounceSearch));
      }

    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };
  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <TextField
          fullWidth
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          variant="outlined"
          label="Поиск"
          sx={{ marginY: "10px" }}
        />
        <BooksTable books={books} loading={isLoading} />
        {currentBook && (
          <Dialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {currentBook.volumeInfo.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <span style={{ fontWeight: "bold" }}>Описание:</span> {currentBook.volumeInfo.description || 'Описание отсутствует'}
              </DialogContentText>
              <DialogContentText id="alert-dialog-publishedDate">
                <span style={{ fontWeight: "bold" }}>Дата публикации:</span> {currentBook.volumeInfo.publishedDate || 'Дата публикации отсутствует'}
              </DialogContentText>
              {currentBook?.volumeInfo.authors ? <DialogContentText id="alert-dialog-authors">
                <span style={{ fontWeight: "bold" }}>Авторы:</span> {currentBook?.volumeInfo.authors?.map((author, index) => {
                  return <Typography key={`${author}${index}`}>{author}</Typography>
                })}
              </DialogContentText> : <DialogContentText>Авторы отсутствуют</DialogContentText>}

            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Закрыть</Button>
            </DialogActions>
          </Dialog>
        )}
        {!isLoading && (
          <Button
            sx={{ marginY: "10px" }}
            loadingPosition="start"
            loading={moreBooksLoading}
            variant="contained"
            onClick={loadMoreBooks}
          >
            Загрузить больше
          </Button>
        )}
      </Box>
      <span ref={load} style={{background:"red"}}>qwe</span>
    </>
  );
};

