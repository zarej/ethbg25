import { useAccount } from 'wagmi';

import ConnectWallet from '../ConnectWallet';

import BuilderBob from './../../../assets/builder-bob.png';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export default function Header() {
  const { isConnected } = useAccount();

  return (
    <div>
      <div className="py-3 px-4 border-b">
        <div className="flex flex-row justify-between max-w-4xl mx-auto">
          <img src={BuilderBob} alt="Nx Logo" width="75" height="50" />
          <ConnectWallet />
        </div>
      </div>
      <div className="border-b py-2">
        <div className="max-w-4xl mx-auto flex flex-row gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames('flex gap-3 items-center px-3 py-1 rounded-md', {
                'bg-lime-200': isActive,
              })
            }
          >
            <span className="material-symbols-outlined">visibility</span>{' '}
            Overview
          </NavLink>
          {isConnected && (
            <NavLink
              to="/add"
              className={({ isActive }) =>
                classNames('flex gap-3 items-center px-3 py-1 rounded-md', {
                  'bg-lime-200': isActive,
                })
              }
            >
              <span className="material-symbols-outlined">domain_add</span> Add
              building
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
