import { ConnectKitButton } from 'connectkit';
import Button from '../Button';

export default function ConnectWallet() {
  return (
    <ConnectKitButton
      customTheme={{
        '--ck-connectbutton-color': '#ffffff',
        '--ck-connectbutton-background': '#84cc16',
      }}
    />
  );
}
