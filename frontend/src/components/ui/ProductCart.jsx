import { Box, Heading, HStack, Image, Text, Button, For, Container, VStack, Input} from '@chakra-ui/react'
import React from 'react'
import { useColorMode } from './color-mode'
import { Toaster, toast } from 'react-hot-toast';
import { FcEditImage, FcEmptyTrash } from "react-icons/fc";
import { useProductStore } from '@/store/product';
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from 'react';



const productCart = ({product}) => {
    
  const [updatedProduct, setUpdatedProduct] = useState(product);

    const {deleteProduct, updateProduct} = useProductStore()

    const handleDeleteProduct = async (pid) => {
        const {success,message} = await deleteProduct(pid)
        if(success){
            toast.success('Product deleted successfully!',message);
        }else {
          toast.error(message);
        }
    }
    const textColor = useColorMode("gray.600", "gray.200")
    const bg = useColorMode("white", "gray.800")
    const handleUpdateProduct = async (pid, updatedProduct) => {
      const { success, message } = await updateProduct(pid, updatedProduct);
      if (!success) {
      toast.success('Product updated successfully!', message);
      document.querySelector('[data-dialog-action]').click(); // Trigger the dialog action
      
      } else {
      toast.error(message);
      }
    }
  return (
    <Box
    shadow={"lg"}
    rounded={'lg'}
    overflow={"hidden"}
    transition={'all .3s ease'}
    _hover={{transform: 'translateY(-5px)', shadow: 'xl'}}
    bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
        <Box p={6}>
            <Heading as={"h3"} Size={"md"}>
                {product.name}
            </Heading>
            <Text fontWeight={'bold'} fontSize={'xl'} mb={4} color={textColor}>
                {product.price}
            </Text>
            <HStack spacing={4}>
                <DialogRoot placement="center" motionPreset="slide-in-bottom">
                        <DialogTrigger asChild>
                          <Button colorScheme={'blue'} ><FcEditImage /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Product </DialogTitle>
                          </DialogHeader>
                          <DialogBody>

                            <VStack spacing={6}>
                            <Input
                            placeholder='name'
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e)=> setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
                            
                            >
                            </Input>
                            <Input
                            placeholder='price'
                            name="price"
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e)=> setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
                            
                            >
                            </Input>
                            <Input
                            placeholder='image url'
                            name="image"
                            value={updatedProduct.image}
                            onChange={(e)=> setUpdatedProduct({ ...updatedProduct, image: e.target.value})}
                            >
                            </Input>
                            </VStack>
                          </DialogBody>
                          <DialogFooter>
                            <DialogActionTrigger asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogActionTrigger>
                            <Button 
                            onClick={()=>handleUpdateProduct(product._id, updatedProduct)}
                            >Update</Button>
                          </DialogFooter>
                          <DialogCloseTrigger />
                        </DialogContent>
                      </DialogRoot>
                <Button colorScheme={'blue'} onClick={() => handleDeleteProduct(product._id)}  >
                <FcEmptyTrash />
                </Button>
            </HStack>
        </Box>
        <Toaster position="bottom-center" reverseOrder={true} />
    </Box>
  )
}

export default productCart
