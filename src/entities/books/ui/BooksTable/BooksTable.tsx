import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material"
import { MyLoader } from "../../../../shared/ui/Loader"
import type { IBook } from "../../types"
import { BooksTableRow } from "../BooksTableRow/BooksTableRow";
import { useEffect, useRef } from "react";
interface BooksTableProps {
  books: IBook[];
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

export const BooksTable = ({books,loading,onLoadMore,hasMore}:BooksTableProps) => {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(!observerRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          onLoadMore()
        }
      },
      {threshold:0.1}
    );
    observer.observe(observerRef.current);
    return () => {
      if(observerRef.current) {
         observer.unobserve(observerRef.current)
      }
    }
  },[onLoadMore,hasMore])
    return (
        <>
        <TableContainer variant="outlined" component={Paper}>
      {!loading ? (
        <>
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
          {hasMore && (
            <Box ref={observerRef} sx={{ height: '20px', width: '100%' }} />
          )}
        </>
      ) : (
        <MyLoader />
      )}
    </TableContainer>
        </>
    )
}