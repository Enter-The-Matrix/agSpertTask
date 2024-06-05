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
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";

function SaleOrderModal({ isOpen, onClose }) {
  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { value, options, onChange, setOptions } = useMultiSelect({
    value: [],
    options: [],
  });

  const [productData, setProductData] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  // Simulate fetching options from an API or define them here
  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOptions = [
        { value: 'product5', label: 'Product 5' },
        { value: 'stockedProduct1', label: 'Stocked Product I' },
        { value: 'benoitSaintDenis', label: 'Benoit Saint Denis' },
        { value: 'anonymousProduct', label: 'Anonymous Product' },
        { value: 'stockedTea1', label: 'Stocked Tea I' },
        { value: 'stockedTea2', label: 'Stocked Tea II' },
      ];
      setOptions(fetchedOptions);
    };

    const fetchProductData = async () => {
      // Simulate fetching product data from an API
      const products = [
        {
          id: 209,
          name: "New Product",
          skus: [
            {
              id: 248,
              selling_price: 54,
              max_retail_price: 44,
              quantity_in_inventory: 33,
              amount: 33,
              unit: "kg",
            },
            {
              id: 247,
              selling_price: 32,
              max_retail_price: 32,
              quantity_in_inventory: 33,
              amount: 33,
              unit: "kg",
            },
            {
              id: 246,
              selling_price: 23,
              max_retail_price: 21,
              quantity_in_inventory: 22,
              amount: 22,
              unit: "kg",
            },
          ],
        },
      ];
      setProductData(products);
    };

    fetchOptions();
    fetchProductData();
  }, [setOptions]);

  const handleItemChange = (skuId, field, value) => {
    setOrderItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.sku_id === skuId ? { ...item, [field]: value } : item
      );
      return updatedItems;
    });
  };

  const handleSubmit = () => {
    const saleOrderForm = {
      customer_id: 11908,
      items: orderItems,
      paid: false,
      invoice_no: "Invoice - 1212121",
      invoice_date: "7/5/2024",
    };
    console.log(saleOrderForm);
    // Submit the sale order form payload to the server
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <Overlay />
      <ModalContent>
        <ModalHeader>Create Sales Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH="80vh" overflowY="auto">
          <FormControl isRequired>
            <FormLabel>All Products</FormLabel>
            <MultiSelect
              options={options}
              value={value}
              label="Choose or create items"
              onChange={onChange}
              create
            />
          </FormControl>
          {productData.map((product) =>
            product.skus.map((sku) => (
              <Box key={sku.id} mt={4} p={4} border="1px" borderRadius="md">
                <Text fontSize="lg" fontWeight="bold">{`${product.name} - SKU ${sku.id}`}</Text>
                <FormControl mt={2}>
                  <FormLabel>Selling Rate</FormLabel>
                  <Input
                    placeholder="Enter selling rate"
                    defaultValue={sku.selling_price}
                    onChange={(e) =>
                      handleItemChange(sku.id, "price", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>Total Items</FormLabel>
                  <Input
                    placeholder="Enter Quantity"
                    onChange={(e) =>
                      handleItemChange(sku.id, "quantity", e.target.value)
                    }
                  />
                </FormControl>
                <Text mt={2} color="green.500">
                  {sku.quantity_in_inventory} Item(s) Remaining
                </Text>
              </Box>
            ))
          )}
        </ModalBody>
        <ModalFooter>
          <div className="w-full flex justify-end items-center gap-2 ">
            <Button onClick={handleSubmit}>Create Order</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SaleOrderModal;




// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Input,
//   FormLabel,
//   FormControl,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { MultiSelect, useMultiSelect } from "chakra-multiselect";

// // eslint-disable-next-line react/prop-types
// function SaleOrderModal({ isOpen, onClose }) {
//   const Overlay = () => (
//     <ModalOverlay
//       bg="blackAlpha.300"
//       backdropFilter="blur(10px) hue-rotate(90deg)"
//     />
//   );

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const { value, options, onChange } = useMultiSelect({
//     value: [{ value: "apple", label: "Apple" }],
//     options: [
//       { value: "apple", label: "Apple" },
//       { value: "banana", label: "Banana" },
//       { value: "orange", label: "Orange" },
//     ],
//   });

//   const handleSubmit = () => {};

//   return (
//     <Modal isCentered isOpen={isOpen} onClose={onClose}>
//       <Overlay />
//       <ModalContent>
//         <ModalHeader>Create Sales Order</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <FormControl isRequired>
//             <MultiSelect
//               options={options}
//               value={value}
//               label="Choose or create items"
//               onChange={onChange}
//               create
//             />
//             <FormLabel marginTop={4}>Item</FormLabel>
//             <Input
//               id="username"
//               placeholder="Enter Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <FormLabel marginTop={4}>Password</FormLabel>
//             <Input
//               id="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </FormControl>
//         </ModalBody>
//         <ModalFooter>
//           <div className="w-full flex justify-end items-center gap-2 ">
//             <Button onClick={handleSubmit}>Close</Button>

//             <Button onClick={onClose}>Close</Button>
//           </div>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

// export default SaleOrderModal;
