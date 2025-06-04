import { Route, Routes, Link } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import Layout from './Layout';
import Web3Provider from './Web3Provider';

export function App() {
  return (
    <Web3Provider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                This is the generated root route.{' '}
                <Link to="/page-2">Click here for page 2.</Link>
              </div>
            }
          />
          <Route
            path="/page-2"
            element={
              <div>
                <Link to="/">Click here to go back to root page.</Link>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Web3Provider>
  );
}

export default App;
