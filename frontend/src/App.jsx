import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/ui/Navbar'
import CreatePage from './Pages/CreatePage'
import { useColorModeValue } from '@/components/ui/color-mode'
import HomePage from './Pages/HomePage'
import Example from './Pages/testPage'

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {<NavBar/>}
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/Create' element={<CreatePage />}/>
        <Route path='/test' element={<Example />}/>
      </Routes>
    </Box>
  )
}

export default App
