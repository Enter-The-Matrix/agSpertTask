import { useContext, useState } from "react";
import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setShowAlert(true);
      return;
    }

    if (username === "admin" && password === "admin") {
      const navigateDashboard = login(username);

      if(navigateDashboard){
        navigate("/");
      }
    } else {
      setShowAlert(true);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (showAlert) setShowAlert(false);
  };

  return (
    <Center h="100vh">
      <Container maxW="md">
        <VStack spacing={4}>
          <FormControl isRequired>
            <Center size="40px">
              <Heading as="h3" size="lg">
                Log-In
              </Heading>
            </Center>
            <form onSubmit={handleLogin}>
              <FormLabel marginTop={4}>Username</FormLabel>
              <Input
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={handleInputChange(setUsername)}
                aria-label="Username"
              />
              <FormLabel marginTop={4}>Password</FormLabel>
              <Input
                id="password"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={handleInputChange(setPassword)}
                aria-label="Password"
              />

              {showAlert && (
                <Alert marginTop={4} status="error">
                  <AlertIcon />
                  <AlertTitle>{`Can't Login`}</AlertTitle>
                  <AlertDescription>
                    Wrong Username or Password
                  </AlertDescription>
                </Alert>
              )}

              <Button
                marginTop={4}
                colorScheme="blue"
                width="full"
                type="submit"
              >
                Login
              </Button>
            </form>
          </FormControl>
        </VStack>
      </Container>
    </Center>
  );
}

export default Login;
