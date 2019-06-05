import * as React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { IEthereumContext, EthereumContext } from '../components/EthereumProvider';
import Button from '../components/Button';
import { COLORS } from '../styles';
import Box from '../components/system/Box';
import Text from '../components/system/Text';
import Flex from '../components/system/Flex';
import Input from '../components/Input';
import Label from '../components/Label';
import { saveState, loadState, PANVALA_STATE } from '../utils/localStorage';
import { splitAddressHumanReadable, isAddress } from '../utils/format';
import StepperMetamaskDialog from '../components/StepperMetamaskDialog';
import RouterLink from '../components/RouterLink';
import Identicon from '../components/Identicon';
import A from '../components/A';

const CancelButton = styled(Button)`
  color: ${COLORS.grey3};
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 1rem;
`;

const Wallet: React.SFC = () => {
  const {
    account,
    contracts: { parameterStore },
    onRefreshBalances,
  }: IEthereumContext = React.useContext(EthereumContext);

  // voter (trezor/ledger) cold wallet
  const [coldWallet, setColdWallet] = React.useState(account);
  // delegate (metamask) hot wallet
  const [hotWallet, setHotWallet] = React.useState('');
  const [step, setStep] = React.useState(0);

  function handleChangeHotWallet(e: React.ChangeEvent<HTMLInputElement>) {
    setHotWallet(e.target.value);
  }

  async function handleClickContinue() {
    // TODO: (might not be possible) check if hotWallet is an unlocked account in metamask
    if (isAddress(hotWallet)) {
      setStep(1);

      if (!isEmpty(parameterStore)) {
        try {
          // TODO:
          // const response = await gatekeeper.functions.delegateVoter(hotWallet);
          // setTxPending(true);

          // await response.wait();
          // setTxPending(false);

          // save to local storage
          saveState(PANVALA_STATE, {
            hotWallet,
            coldWallet,
          });

          toast.success('delagate voter tx mined');
          onRefreshBalances();
        } catch (error) {
          if (!error.message.includes('User denied message signature.')) {
            throw error;
          }
        }
      }
    }
  }

  React.useEffect(() => {
    if (account) {
      setColdWallet(account);

      // get persisted state from local storage
      const localState = loadState(PANVALA_STATE);
      if (localState && localState.coldWallet === account && localState.hotWallet) {
        setHotWallet(localState.hotWallet);
      }
    }
  }, [account]);

  const steps = [
    <>
      <Text textAlign="center" fontSize={'1.5rem'} m={0}>
        Link hot and cold wallets
      </Text>
      <RouterLink href="/slates" as="/slates">
        <CancelButton>Cancel</CancelButton>
      </RouterLink>

      {/* prettier-ignore */}
      <Text lineHeight={1.5}>
        Please select your <A bold color="blue">cold wallet</A>, we support Ledger and Trezor.
        Then select the <A bold color="blue">hot wallet</A> you would like to link it to.
        Your hot wallet will be your delegated voting wallet.
      </Text>

      <Label htmlFor="cold-wallet">{'Select cold wallet'}</Label>
      <Flex justifyStart noWrap alignCenter>
        <Identicon address={account} diameter={20} />
        <Input
          m={2}
          fontFamily="Fira Code"
          name="cold-wallet"
          onChange={(e: any) => setColdWallet(e.target.value)}
          value={coldWallet}
          disabled
        />
      </Flex>
      {/* prettier-ignore */}
      <Text mt={0} mb={4} fontSize={0} color="grey">
        This wallet must be connected. How to connect <A bold color="blue">Trezor</A> and <A bold color="blue">Ledger</A>.
      </Text>

      <Label htmlFor="hot-wallet">{'Select hot wallet'}</Label>
      <Flex justifyStart noWrap alignCenter>
        <Identicon address={hotWallet} diameter={20} />
        <Input
          m={2}
          fontFamily="Fira Code"
          name="hot-wallet"
          onChange={handleChangeHotWallet}
          value={hotWallet}
        />
      </Flex>
      <Text mt={0} mb={4} fontSize={0} color="grey">
        Reminder: This is the address that will be able to vote with your PAN.
      </Text>

      <Flex justifyEnd>
        <Button width="200px" large type="default" onClick={handleClickContinue}>
          Confirm and Continue
        </Button>
      </Flex>
    </>,
    <>
      <Text textAlign="center" fontSize={'1.5rem'} m={0}>
        Grant Permissions
      </Text>
      <CancelButton onClick={null}>Cancel</CancelButton>

      <Text lineHeight={1.5}>
        By granting permissions in this transaction, you are allowing your proxy voting contract to
        lock your PAN. You are not relinquishing control of your PAN and can withdraw it at anytime.
      </Text>

      <StepperMetamaskDialog />
    </>,
    <>
      <Text textAlign="center" fontSize={'1.5rem'} m={0}>
        Wallets linked!
      </Text>
      <CancelButton onClick={null}>Cancel</CancelButton>

      <Text lineHeight={1.5}>
        You have now linked your cold and hot wallets. You can change these settings any time on the
        ballot screen or when you go to vote.
      </Text>

      <Flex justifyEnd>
        <Button width="200px" large type="default" onClick={handleClickContinue}>
          Confirm and Continue
        </Button>
      </Flex>
    </>,
  ];

  return (
    <Flex justifyCenter>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width={550}
        p={4}
        mt={[2, 3, 5, 6]}
        borderRadius={10}
        boxShadow={0}
      >
        <Box position="relative">{steps[step]}</Box>
      </Box>
    </Flex>
  );
};

export default Wallet;
