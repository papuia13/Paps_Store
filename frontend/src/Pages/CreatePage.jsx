import { Container, Heading, VStack, Box, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toast } from 'react-hot-toast';
import { useProductStore } from "@/store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success('Product created successfully!',message);
    } else {
      toast.error(message);
    }
    setNewProduct({ name: '', price: '', image: '' });
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={"2xl"} textAlign={"center"} mb={8} mt={8}>CREATE NEW PRODUCT</Heading>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack gap={4}>
            <Input
              placeholder="(product name)"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="(price)"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="(image url)"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button
              colorScheme={'blue'}
              size="sm"
              onClick={handleAddProduct}
              w={'full'}
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster position="bottom-center" reverseOrder={true} />
    </Container>
  );
};

export default CreatePage;