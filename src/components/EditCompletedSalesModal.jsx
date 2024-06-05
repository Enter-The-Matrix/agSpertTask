import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function EditCompletedSalesModal({ isOpen, onClose, modalData }) {
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
              <ModalHeader>Completed Sales Order </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl >
                  <FormLabel>Customer ID: {cusId}</FormLabel>
                  
                  <FormLabel marginTop={4}>Customer Name: {cusName}</FormLabel>
                 
                  <FormLabel marginTop={4}> Price: &#8377;{price}</FormLabel>
                 
                  <FormLabel marginTop={4}>Last Modified: {lastModified}</FormLabel>
                 
                </FormControl>
              </ModalBody>
              <ModalFooter>
                  <Button
                    onClick={() => {
                      onClose();
                      resetFields();
                    }}
                  >
                    Close
                  </Button>
                
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
}

export default EditCompletedSalesModal;
