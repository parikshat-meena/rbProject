import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import Navigation from './src/navigation/navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
