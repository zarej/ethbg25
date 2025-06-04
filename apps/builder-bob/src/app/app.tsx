import { Route, Routes, Link } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { config } from './../config';

import Layout from './Layout';

export function App() {
  return (
    <WagmiProvider config={config}>
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
    </WagmiProvider>
  );
}

export default App;
