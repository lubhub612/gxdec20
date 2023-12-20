import React, { useState } from 'react';
import { Drawer, Space } from 'antd';
import { BuyTokenStyle,  ConnectWallets, } from './styles';
import Eth from '../../assets/images/eth.png';
import wallet1 from '../../assets/images/icons/1.svg';
import wallet2 from '../../assets/images/icons/2.svg';
import wallet3 from '../../assets/images/icons/3.svg';
import wallet4 from '../../assets/images/icons/4.svg';
import Matic from '../../assets/images/coins/matic.svg';
import GX from '../../assets/images/coins/GX.svg';
import Usdt from '../../assets/images/coins/tether.svg';
import Weth from '../../assets/images/coins/weth.svg';
import { useTranslation } from "react-i18next";
////import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers';
import roxabi from '../../abis/GX_Sell.json';
import usdt from '../../abis/USDT_token.json';
import weth from '../../abis/WETH.json';
import { useCustomWallet } from '../../contexts/WalletContext';
import { ConnectWalletForm } from '../Shared/ConnectWalletForm';
import MainModal from '../Shared/MainModal';

const GX_CONTRACT_ADDRESS = '0x25b04f79f554f124520098a6e0fabd7a157c5cd5';
const USDT_TETHER_TOKEN_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
const WETH_TOKEN_ADDRESS = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';


export default function BuyTokenArea() {

 const { wallet } = useCustomWallet();


 const [coinBox, setCoinBox] = useState(false);
 const [coinData, setCoinData] = useState({ name: "USDT", img: "tether.svg"  });


  const { t } = useTranslation();

  const [userInputValue, setUserInputValue] = useState('');
  const [estimateValue, setEstimateValue] = useState('');
  const [buttonStatusUSDT, setButtonStatusUSDT] = useState('approveUSDT');
  const [buttonStatusWETH, setButtonStatusWETH] = useState('approveWETH');
  const [estimateWethValue, setEstimateWethValue] = useState('');
  const [estimateUsdtValue, setEstimateUsdtValue] = useState('');

  const [isMenu, setIsMenu] = useState(false);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);


  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);



  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-rpc.com"
  );


  const handleConnectWallet = () => {
    setIsMenu(false);
    setShowConnectWallet(true);
  };


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer2 = () => {
    setOpen2(true);
  };
  const onClose2 = () => {
    setOpen2(false);
  };
  const showDrawer3 = () => {
    setOpen3(true);
  };
  const onClose3 = () => {
    setOpen3(false);
  };
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
  };

  const GXContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const GXContract = new ethers.Contract(
        GX_CONTRACT_ADDRESS,
        roxabi,
        signer
      );
      return GXContract;
    } catch (error) {
      console.log(error);
    }
  };

  const GXContract1 = async () => {
    try {

      const GXContract1 = new ethers.Contract(
        GX_CONTRACT_ADDRESS,
        roxabi,
        provider
      );
      return GXContract1;
    } catch (error) {
      console.log(error);
    }
  };

  const UsdtContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const UsdtContract = new ethers.Contract(
        USDT_TETHER_TOKEN_ADDRESS,
        usdt,
        signer
      );
      return UsdtContract;
    } catch (error) {
      console.log(error);
    }
  };


  const WethContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const WethContract = new ethers.Contract(
        WETH_TOKEN_ADDRESS,
        weth,
        signer
      );
      return WethContract;
    } catch (error) {
      console.log(error);
    }
  };

  const handleEstimate = async (val) => {

     try {
       if (!wallet.address) {
        if (val > 0) {
        let _GXContract1 = await GXContract1();
        if( coinData.name === 'USDT') {
          let  _getEstimate = await _GXContract1.estimateWithUsdt(
              ethers.utils.parseEther(val)
            );

            setEstimateUsdtValue(_getEstimate);
            setEstimateValue((_getEstimate.toString() / 10 ** 6).toFixed(2));
          } else if (coinData.name === 'WETH') {
           let  _getEstimate = await _GXContract1.estimateWithWeth(
              ethers.utils.parseEther(val)
            );

            setEstimateWethValue(_getEstimate);
            setEstimateValue((_getEstimate.toString() / 10 ** 18).toFixed(6));
          } else {
          let  _getEstimate = await _GXContract1.estimateWithMatic(
              ethers.utils.parseEther(val)
            );

            setEstimateValue((_getEstimate.toString() / 10 ** 18).toFixed(6));
           }
        }
      }
     let _GXContract = await GXContract();

     setUserInputValue(val);
     if (!val) {
       setEstimateValue('0');
     }

     if (val > 0) {

     if( coinData.name === 'USDT') {
     let  _getEstimate = await _GXContract.estimateWithUsdt(
         ethers.utils.parseEther(val)
       );

       setEstimateUsdtValue(_getEstimate);
       setEstimateValue((_getEstimate.toString() / 10 ** 6).toFixed(2));
     } else if (coinData.name === 'WETH') {
      let  _getEstimate = await _GXContract.estimateWithWeth(
         ethers.utils.parseEther(val)
       );

       setEstimateWethValue(_getEstimate);
       setEstimateValue((_getEstimate.toString() / 10 ** 18).toFixed(6));
     } else {
     let  _getEstimate = await _GXContract.estimateWithMatic(
         ethers.utils.parseEther(val)
       );

       setEstimateValue((_getEstimate.toString() / 10 ** 18).toFixed(6));
      }
     }
   } catch (error) {
     console.log(error);
   }
   };

   const handleEstimateToken = async (val) => {
    try {
      if (!wallet.address) {

        let _GXContract1 = await GXContract1();

        if( coinData.name === 'USDT') {
          let  _getEstimate = await _GXContract1.estimateWithUsdt(
              ethers.utils.parseEther("1")
            );

            let roxVal = ((5) * (val)).toFixed(0);
          setUserInputValue(roxVal.toString());

          } else if (coinData.name === 'WETH') {
           let  _getEstimate = await _GXContract1.estimateWithWeth(
              ethers.utils.parseEther("1")
            );

           let estimateWETH = (_getEstimate.toString() / 10 ** 18);
            let estiWETH = 1/(estimateWETH);
            let estiTotalWETH = val * estiWETH;
            let estimateWethTotal = estiTotalWETH.toFixed(6)
            setUserInputValue(estimateWethTotal.toString());
          } else {

          let  _getEstimate = await _GXContract1.estimateWithMatic(
              ethers.utils.parseEther("1")
            );
           let estimateMATIC = (_getEstimate.toString() / 10 ** 18);
            let estiMATIC = 1/(estimateMATIC);
            let estiTotalMATIC = val * estiMATIC;
            let estimateMaticTotal = estiTotalMATIC.toFixed(6)
            setUserInputValue(estimateMaticTotal.toString());
           }

   //     return null;
      }
      if (!val) {
        setUserInputValue('0');
      }
      let _GXContract = await GXContract();
      setEstimateValue(val);
      if (val > 0) {
      if( coinData.name === 'USDT') {
        let  _getEstimate = await _GXContract.estimateWithUsdt(
            ethers.utils.parseEther("1")
          );

          let roxVal = ((5) * (val)).toFixed(0);

        setUserInputValue(roxVal.toString());

        } else if (coinData.name === 'WETH') {
         let  _getEstimate = await _GXContract.estimateWithWeth(
            ethers.utils.parseEther("1")
          );

          let estimateWETH = (_getEstimate.toString() / 10 ** 18);
          let estiWETH = 1/(estimateWETH);
          let estiTotalWETH = val * estiWETH;
          let estimateWethTotal = estiTotalWETH.toFixed(6)
          setUserInputValue(estimateWethTotal.toString());
        } else {

        let  _getEstimate = await _GXContract.estimateWithMatic(
            ethers.utils.parseEther("1")
          );

         let estimateMATIC = (_getEstimate.toString() / 10 ** 18);
          let estiMATIC = 1/(estimateMATIC);
          let estiTotalMATIC = val * estiMATIC;
          let estimateMaticTotal = estiTotalMATIC.toFixed(6)
          setUserInputValue(estimateMaticTotal.toString());
         }

        }

    } catch (error) {
      console.log(error);
    }
  };

   const handleApproveUSDT = async () => {

    try {
      let _UsdtContract = await UsdtContract();
      let _GXContract = await GXContract();
      let  _getEstimate = await _GXContract.estimateWithUsdt(
        ethers.utils.parseEther(userInputValue)
      );

      let _approve = await _UsdtContract.approve(
        GX_CONTRACT_ADDRESS,
        _getEstimate
      );
      let waitForTx = await _approve.wait();
      if (waitForTx) {

        setButtonStatusUSDT('buyUSDT');
      //  toast.success('Approved successfull.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveWETH = async () => {

    try {
      let _WethContract = await WethContract();
      let _GXContract = await GXContract();
      let  _getEstimate = await _GXContract.estimateWithWeth(
        ethers.utils.parseEther(userInputValue)
      );

      let _approve = await _WethContract.approve(
        GX_CONTRACT_ADDRESS,
        _getEstimate
      );
      let waitForTx = await _approve.wait();
      if (waitForTx) {

        setButtonStatusWETH('buyWETH');
        //toast.success('Approved successfull.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyUsdt = async () => {


    try {
      let _GXContract = await GXContract();


      if (userInputValue <= 0) {
      //  return toast.error('Value should be positive.');
      }
      let roxVal = (userInputValue) * (10 ** 6);

      let _buy = await _GXContract.buyWithUsdt(
        ethers.utils.parseEther(userInputValue)
      );
      let waitForTx = await _buy.wait();
      if (waitForTx) {
       // toast.success('Transaction successfull.');
      }

    } catch (error) {
      console.log(error);
    }
  };


  const handleBuyWeth = async () => {


    try {
      let _GXContract= await GXContract();


      if (userInputValue <= 0) {
     //   return toast.error('Value should be positive.');
      }
      let roxVal = (userInputValue) * (10 ** 18);

      let _buy = await _GXContract.buyWithWeth(
        ethers.utils.parseEther(userInputValue)
      );
      let waitForTx = await _buy.wait();
      if (waitForTx) {
       // toast.success('Transaction successfull.');
      }

    } catch (error) {
      console.log(error);
    }
  };


  const handleBuyMatic = async () => {

    try {
      let _GXContract = await GXContract();


      if (userInputValue <= 0) {
       // return toast.error('Value should be positive.');
      }
     let GXVal = (userInputValue) * (10 ** 18);

      let maticVal = (estimateValue) * (10 ** 18);

      let  _getEstimate = await _GXContract.estimateWithMatic(
        ethers.utils.parseEther(userInputValue)
      );

      let _buy = await _GXContract.buyWithMatic(
        ethers.utils.parseEther(userInputValue) ,  { value: _getEstimate }
      );
      let waitForTx = await _buy.wait();
      if (waitForTx) {
       // toast.success('Transaction successfull.');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

    {showConnectWallet && (
      <MainModal
        title={'My Wallet'}
        handleClose={() => setShowConnectWallet(false)}
      >
        <ConnectWalletForm
          goToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
          handleClose={() => setShowConnectWallet(false)}
        />
      </MainModal>
    )}
    <BuyTokenStyle>
      <h2>Buy GX</h2>
      <div className="buy-token-area" style={containerStyle}>
        <h3>
          Swap{' '}
          <strong>
            <span onClick={showDrawer2}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icons-sc-lekdau-0 ikXrwp"
              >
                <path
                  d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V7Z"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
                <path
                  d="M4 19H20C21.1046 19 22 18.1046 22 17V14C22 12.8954 21.1046 12 20 12H16C15.4477 12 14.9935 12.4624 14.7645 12.965C14.4438 13.6688 13.789 14.5 12 14.5C10.29 14.5 9.48213 13.7406 9.1936 13.0589C8.96576 12.5206 8.49905 12 7.91447 12H4C2.89543 12 2 12.8954 2 14V17C2 18.1046 2.89543 19 4 19Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22 13V11C22 9.89543 21.1034 9 19.9989 9C14.0294 9 9.97062 9 4.00115 9C2.89658 9 2 9.89543 2 11V13"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
              </svg>
            {/*}  Connect wallet to swap  */}
            </span>{' '}
            <span onClick={showDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icons-sc-lekdau-0 ikXrwp"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </span>
          </strong>
        </h3>
        <div className="buy-token-input-group">
          <div className="buy-token-input-item">
            <input type="number" placeholder="0" value={estimateValue} onChange={(e) => handleEstimateToken(e.target.value)} />
            <button onClick={showDrawer3}>
              <img src={coinData.name == 'USDT' ? Usdt :  coinData.name === 'WETH' ? Weth : Matic } alt={coinData.name} />
              {coinData.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icons-sc-lekdau-0 ikXrwp"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <div className="buy-token-switch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icons-sc-lekdau-0 ikXrwp"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
          <div className="buy-token-input-item">
            <input type="number" placeholder="0" value={userInputValue} onChange={(e) => handleEstimate(e.target.value)}  />
            <button >
              <img src={GX} alt="icon" />
              GX{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icons-sc-lekdau-0 ikXrwp"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
        <p>
         {/* 1 GX = 0.2 USDT
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-exclamation-triangle"
            viewBox="0 0 16 16"
          >
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
          </svg>
          Connect wallet to swap */}
        </p>
        <div className="buy-token-connect">
       {/*}   <button>Review swap</button>  */}
       <>
       {window.web3 ? (
      <>

            {coinData.name === 'MATIC' ? (
              <button className="swap-now"  onClick={handleBuyMatic}>{t("SWAP")}</button>
            ) : (
              <>
            {coinData.name === 'USDT' && buttonStatusUSDT === 'approveUSDT' ? (
              <button className="swap-now" onClick={handleApproveUSDT}>{t('APPROVE')}</button>
            ) : (
              <>
              {coinData.name === 'WETH' && buttonStatusWETH === 'approveWETH' ? (
                <button className="swap-now" onClick={handleApproveWETH}>{t('APPROVE')}</button>
              ) : (
                ''
              )}

          {/*}   <button className="swap-now"  onClick={handleBuyWeth}>{t('SWAP WETH')}</button>  */}
          {/*}  <button className="swap-now">{t('SWAP USDT')}</button>  */}
            </>
               )}
               <>
              {coinData.name === 'USDT' && buttonStatusUSDT === 'buyUSDT' ? (
            <button className="swap-now"  onClick={handleBuyUsdt}>{t('SWAP')}</button>
              ) : (
                    ''
              )}

            </>

            <>
              {coinData.name === 'WETH' && buttonStatusWETH=== 'buyWETH' ? (
            <button className="swap-now"  onClick={handleBuyWeth}>{t('SWAP')}</button>
              ) : (
                    ''
              )}

            </>
            </>
         )}

          </>
       ) : (
        <ConnectWallets onClick={handleConnectWallet}>
              <button>{t('Connect wallet')}</button>
            </ConnectWallets>
       )}
       </>
        </div>
        <Drawer
          title="Settings"
          placement="right"
          closable={false}
          size="large"
          onClose={onClose}
          open={open}
          getContainer={false}
          extra={
            <Space>
              <div onClick={onClose} className="text-white active-cursor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="va-middle bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </Space>
          }
        >
          <div className="setting-area-sidebar">
            <div className="setting-area-sidebar-item">
              <h2>Max slippage</h2>
              <input type="number" placeholder="0" />
            </div>
            <div className="setting-area-sidebar-item">
              <h2>Transaction deadline</h2>
              <input type="number" placeholder="0" />
            </div>
          </div>
        </Drawer>
        <Drawer
          title="Connect wallet"
          placement="right"
          closable={false}
          size="large"
          onClose={onClose2}
          open={open2}
          getContainer={false}
          extra={
            <Space>
              <div onClick={onClose2} className="text-white active-cursor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="va-middle bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </Space>
          }
        >
          <div className="setting-area-sidebar">
            <ul>
              <li>
                <a href="#">
                  <img src={wallet1} alt="wallet" />
                  <h4>Rainbow</h4>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={wallet2} alt="wallet" />
                  <h4>Coinbase Wallet</h4>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={wallet3} alt="wallet" />
                  <h4>MetaMask</h4>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={wallet4} alt="wallet" />
                  <h4>WalletConnect</h4>
                </a>
              </li>
            </ul>
          </div>
        </Drawer>
        <Drawer
          title="Select a token"
          placement="right"
          closable={false}
          size="large"
          onClose={onClose3}
          open={open3}
          getContainer={false}
          extra={
            <Space>
              <div onClick={onClose3} className="text-white active-cursor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="va-middle bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </Space>
          }
        >
          <div className="setting-area-coin-list">
            <input type="text" placeholder="Search by token name or address" />
            <ul>
              <li
               onClick={() => {
                   setOpen3(false);
                    setCoinData({ name: "USDT", img: "tether.svg" });
                    setUserInputValue('');
                    setEstimateValue('');
                  }}>
                <img src={Usdt} alt="usdt" />{' '}
                <span>
                  <strong>USDT</strong> usdt
                </span>
              </li>
              <li onClick={() => {
                    setOpen3(false);
                    setCoinData({ name: "WETH", img: "weth.svg"  });
                    setUserInputValue('');
                    setEstimateValue('');
                  }}>
                <img src={Weth} alt="weth" />{' '}
                <span>
                  <strong>WETH</strong> Ether
                </span>
              </li>
              <li onClick={() => {
                    setOpen3(false);
                    setCoinData({ name: "MATIC", img: "matic.svg" ,  });
                    setUserInputValue('');
                    setEstimateValue('');
                  }}>
                <img src={Matic} alt="matic" />{' '}
                <span>
                  <strong>MATIC</strong> Matic
                </span>
              </li>
             {/*} <li>
                <img src={Eth} alt="eth" />{' '}
                <span>
                  <strong>ETH</strong> Ether
                </span>
              </li>
              <li>
                <img src={Eth} alt="eth" />{' '}
                <span>
                  <strong>ETH</strong> Ether
                </span>
                </li>  */}
            </ul>
          </div>
        </Drawer>
      </div>
    </BuyTokenStyle>
    </>
  );
}
