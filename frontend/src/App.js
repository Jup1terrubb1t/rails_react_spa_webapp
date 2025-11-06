import Category from './component/Category';
import { Button, Stack, Center, Box, CheckboxGroup, Text } from "@chakra-ui/react";
const App = () => {
  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              掲示板
            </Text>
          </Box>
          <Box mb="24px" textAlign="right">
            <Text fontSize="12px" fontWeight="bold">
              管理者ログイン
            </Text>
          </Box>
          <CheckboxGroup>
            <Category name="買い物" />
            <Category name="ランニング" />
            <Category name="プログラミングの勉強" />
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}
export default App;


// import React from 'react';
// import LoginForm from './component/LoginForm';

// function App() {
//   return (
//     <div>
//       <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
//         React × Rails Devise ログイン
//       </h1>
//       <LoginForm />
//     </div>
//   );
// }
// export default App;
