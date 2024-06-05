import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import { useContext} from "react"; // Import useState, useEffect
import { AuthContext } from "./context/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";

function App() {
  const { user } = useContext(AuthContext);

  const storedTheme = localStorage.getItem("chakra-ui-color-mode")
  const initialTheme = storedTheme ? storedTheme : "dark"
  const customTheme = extendTheme({
    config: {
      initialColorMode: initialTheme,
      useSystemColorMode: false,
    },

    components: {
      MultiSelect: MultiSelectTheme,
    },
  });

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <Dashboard /> : <Navigate to="/login" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);

  return (
    <>
      <ChakraProvider theme={customTheme}>
        <RouterProvider router={appRouter} />
      </ChakraProvider>
    </>
  );
}

export default App;
