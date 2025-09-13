import { useCallback, useEffect, useState } from "react";
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
import { MyLoader } from "../../shared/ui/Loader";
export const BooksPage = () => {
  const dispatch = useAppDispatch();
  
  const { books, 
    isLoading, 
    moreBooksLoading, 
    currentBook, 
    isDialogOpen,
    hasMore  } = useAppSelector(
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
  }, [dispatch, debounceSearch]);

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
  const handleLoadMore = useCallback(() => {

    if(!moreBooksLoading && hasMore && searchParam.trim() !== '') {
      dispatch(loadMore(searchParam))
    }
  },[dispatch, searchParam, moreBooksLoading, hasMore])
  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };
  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <TextField
          data-testid="search-input"
          fullWidth
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          variant="outlined"
          label="Поиск"
          sx={{ marginY: "10px" }}
        />
        <BooksTable books={books} 
        data-testid="books-table"
        loading={isLoading} 
        onLoadMore={handleLoadMore}
        hasMore={hasMore} />

        {moreBooksLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <MyLoader/>
        </Box>
      )}

        {currentBook && (
          <Dialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{wordBreak:'break-all'}}>
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
              <DialogContentText id="alert-dialog-categories">
                <span style={{ fontWeight: "bold" }}>Категории:</span> {currentBook.volumeInfo.categories || 'Категории отсутствуют'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Закрыть</Button>
            </DialogActions>
          </Dialog>
        )}
        {!isLoading && (
          <Button
          data-testid="load-more-button"
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
    </>
  );
};