'use strict';

let $ = document.querySelector.bind(document);

let btnConnect = $('#btnConnect');
let lblAccountAddress = $('#accountAddress');
let lblaccountBalance = $('#accountBalance');

const connect = () => {
  if (window.ethereum) {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        accountChangeHandler(accounts[0]);
      });
  } else {
    console.log('metamask not found');
  }
};

btnConnect.addEventListener('click', connect);

const accountChangeHandler = (account) => {
  lblAccountAddress.innerText = account.toString();
  getUserBalance(account.toString());
};

const getUserBalance = (address) => {
  window.ethereum
    .request({ method: 'eth_getBalance', params: [address, 'latest'] })
    .then((balance) => {
      lblaccountBalance.innerText = ethers.utils.formatEther(balance);
    });
};

window.ethereum.on('accountsChanged', accountChangeHandler);
