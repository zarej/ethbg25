import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Web3Provider from './Web3Provider';

import Add from './pages/Add';
import Home from './pages/Home';
import Campaigns from './pages/Campaign';
import Apartment from './pages/Apartment';

export function App() {
  return (
    <Web3Provider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/campaign/:id" element={<Campaigns />} />
          <Route path="/campaign/:id/apartment/:apartment" element={<Apartment />} />
        </Routes>
      </Layout>
    </Web3Provider>
  );
}

export default App;
