import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Web3Provider from './Web3Provider';

import Home from './pages/Home';
import Campaigns from './pages/Campaign';

export function App() {
  return (
    <Web3Provider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
        </Routes>
      </Layout>
    </Web3Provider>
  );
}

export default App;
