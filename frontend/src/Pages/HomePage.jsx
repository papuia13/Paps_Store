import { Container, SimpleGrid,Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCart from '../components/ui/ProductCart';

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("Product: ",products);
  return (
    <Container
      maxW="container.xl"
      py={12}>
        <VStack gap={8}>
          <Text fontSize="4xl" 
          fontWeight="bold" 
          bgGradient={"linear(to-r, cyan.400, blue.500"} 
          bgClip={"text"} 
          textAlign={"center"}>
            Current Product 🫙
            </Text>
          <SimpleGrid columns={{sm: 1, md: 2, lg: 3}} w={"full"} gap={4}>
             {products.map((product) => (
             <ProductCart key={product._id} product={product} />
             ))}
            </SimpleGrid>

            {products.length === 0 && (
              <Text fontSize="xl" 
              fontWeight="bold" 
              bgGradient={"linear(to-r, cyan.400, blue.500"} 
              bgClip={"text"} 
              textAlign={"center"}>
                No Product Available/Found 
                <Link to="/create">
                <Text fontSize="xl" as={"span"} color={"blue.500"} _hover={{textDecoration: "underline"}}> Create Product</Text>
                </Link>
                </Text>
            )}
        </VStack>
      </Container>
  )
}

export default HomePage