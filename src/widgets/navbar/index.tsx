import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            component={Link}
            to={`/`}
            size="medium"
            sx={{ margin: "10px" }}
            color="inherit"
            variant="text"
          >
            Home
          </Button>

          <Button
            component={Link}
            to={`/books`}
            size="medium"
            sx={{ margin: "10px" }}
            color="inherit"
            variant="text"
          >
            Books
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
