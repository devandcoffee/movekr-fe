import React from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Board } from './pages/Board';

import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Raleway',
  },
});

const App: React.FunctionComponent = () => {
  return (
    <ChakraProvider theme={theme}>
      <Board />
    </ChakraProvider>
  );
};

export default App;
