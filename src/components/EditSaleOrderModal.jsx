import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function EditSaleOrderModal({ isOpen, onClose, modalData }) {
  const [cusId, setCusId] = useState("");
  const [cusName, setCusName] = useState("");
  const [price, setPrice] = useState("");
  const [lastModified, setLastModified] = useState("");

  useEffect(() => {
    if (modalData) {
      setCusId(modalData.customer_id);
      setCusName(modalData.customer_name);
      setPrice(modalData.price);
      setLastModified(modalData.last_modified);
    }
  }, [modalData]);

  const resetFields = () => {
    setCusId("");
    setCusName("");
    setPrice("");
    setLastModified("");
  };

  const handleSubmit = () => {
    onClose();
    resetFields();
  };

  return (
    <>
      {modalData && (
        <div>
          <Modal
            isCentered
            isOpen={isOpen}
            onClose={() => {
              onClose();
              resetFields();
            }}
          >
            <ModalOverlay
              bg="blackAlpha.300"
              backdropFilter="blur(10px) hue-rotate(90deg)"
            />
            <ModalContent>
              <ModalHeader>Edit Sales Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>Customer ID</FormLabel>
                  <Input
                    id="cusId"
                    value={cusId}
                    onChange={(e) => setCusId(e.target.value)}
                  />
                  <FormLabel marginTop={4}>Customer Name</FormLabel>
                  <Input
                    id="cusName"
                    value={cusName}
                    onChange={(e) => setCusName(e.target.value)}
                  />
                  <FormLabel marginTop={4}>Price</FormLabel>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <FormLabel marginTop={4}>Last Modified</FormLabel>
                  <Input
                    id="lastModified"
                    value={lastModified}
                    onChange={(e) => setLastModified(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex justify-end items-center gap-2">
                  <Button onClick={handleSubmit}>Save Changes</Button>
                  <Button
                    onClick={() => {
                      onClose();
                      resetFields();
                    }}
                  >
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
}

export default EditSaleOrderModal;
