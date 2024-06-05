import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Spacer,
  Box,
  useDisclosure,
  Stack,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SaleOrderModal from "../components/SaleOrderModal";
import { saleOrderData } from "../assets/saleOrder";
import ActiveSalesTable from "../components/ActiveSalesTable";
import CompletedSalesTable from "../components/CompletedSalesTable";
import moon from "../assets/moon.png";
import sun from "../assets/sun.png";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    logout();
  };

  const handleToggle = () => {
    toggleColorMode();
  };

  return (
    <>
      <Box paddingRight={4} marginTop={4}>
        <Stack direction="row" align="center" justify="end">
          <Button onClick={handleLogout}>Logout</Button>
          <Text>
            {colorMode === "light"
              ? "Switch to Dark Theme"
              : "Switch to Light Theme"}
          </Text>
          {colorMode === "light" ? (
            <img style={{ width: "25px", height: "25px" }} src={moon}></img>
          ) : (
            <img style={{ width: "25px", height: "25px" }} src={sun}></img>
          )}

          <Switch
            colorScheme="blue"
            size="lg"
            isChecked={colorMode === "dark"}
            onChange={handleToggle}
          />
        </Stack>
      </Box>

      <Tabs variant="enclosed" colorScheme="green">
        <TabList className="flex justify-between items-center px-4">
          <Box className="flex justify-center items-center">
            <Tab>Active Sales Order</Tab>
            <Tab>Completed Sales Order</Tab>
          </Box>
          <Spacer />
          <Box>
            <Button onClick={onOpen}>+ Sale Order</Button>
          </Box>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveSalesTable tableData={saleOrderData} />
          </TabPanel>
          <TabPanel>
            <CompletedSalesTable tableData={saleOrderData} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SaleOrderModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Dashboard;
