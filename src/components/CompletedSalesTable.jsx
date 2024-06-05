import {
  Avatar,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";
import EditCompletedSalesModal from "./EditCompletedSalesModal";
import { AiOutlineUser } from "react-icons/ai";

function CompletedSalesTable({ tableData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState(null);

  const handleEdit = (order) => {
    // console.log(order);
    setModalData(order);
    onOpen();
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Active Sales Order</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer Name</Th>
              <Th isNumeric>Price</Th>
              <Th textAlign="center">Last Modified</Th>
              <Th textAlign="center">View</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((order) => (
              <Tr key={order.customer_id}>
                <Td>{order.customer_id}</Td>
                <Td><div className=" flex items-center gap-2 ">
                    <Avatar
                      bg="green.500"
                      icon={<AiOutlineUser fontSize="1.5rem" />}
                    />
                    {order.customer_name}
                  </div></Td>
                <Td isNumeric>{order.price}</Td>
                <Td textAlign="center">{order.last_modified}</Td>
                <Td textAlign="center">
                  <span
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={() => handleEdit(order)}
                  >
                    ...
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <EditCompletedSalesModal
        isOpen={isOpen}
        onClose={onClose}
        modalData={modalData}
      />
    </>
  );
}

export default CompletedSalesTable;
