import React, { useEffect, useState } from "react";
import { TransactionsContainer } from "./styles";
import { useGlobal } from "../../contexts/GlobalContext";

export const UserTransactions = (props) => {
  // Dummy data rows
  const dummyData = [
    {
      user_id: 1,
      wallet_address: "0xAbCdEfGhIjKlMnOpQrStUvWxYz",
      transaction_id: "123abc456def",
      cryptocurrency: "Bitcoin",
      order_description: "5000 credits",
      amount: 0.005,
      date: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    },
    {
      user_id: 2,
      wallet_address: "0x1a2B3c4D5e6F7G8H9i0Jk",
      transaction_id: "789ghi012jkl",
      order_description: "10000 credits",
      cryptocurrency: "Ethereum",
      amount: 1.25,
      date: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    },
    {
      user_id: 3,
      wallet_address: "0XeFgHiJkLmNoPqRsTuVwXyZaB",
      transaction_id: "345mno678pqr",
      order_description: "20000 credits",
      cryptocurrency: "Litecoin",
      amount: 5.75,
      date: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    },
  ];
  const { invokeServer } = useGlobal();
  const [myPayments, setMyPayments] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("logInIdV1"));

    invokeServer("get", `/api/transactions/user-payments/${user?.id}`)
      .then((response) => {
        console.log("complete trans resonse", response.data.data);
        let res = response.data.data;
        setMyPayments(res);
      })
      .catch((err) => {
        console.log("search-err:", err.message);
        // toastError("Fail:", err.message);
      });
  }, []);
  return (
    <TransactionsContainer>
      <div class="transaction-area-body">
        <div class="header">
          <h2>Transaction History</h2>
        </div>
        {myPayments?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                {/* <th>Wallet Address</th> */}
                <th>Transaction ID</th>
                {/* <th>Cryptocurrency</th> */}
                <th>Amount</th>
                <th>Service</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.length > 0 &&
                myPayments?.map((data, index) => (
                  <tr key={index}>
                    <td>{data?.user_id}</td>
                    {/* <td>{data.wallet_address}</td> */}
                    <td>{data?.payment_id}</td>
                    {/* <td>{data.cryptocurrency}</td> */}
                    <td>{data?.price_amount}</td>
                    <td>{data?.order_description}</td>
                    <td>{data?.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h4 style={{ textAlign: "center" }}>No Transaction Found</h4>
          </div>
        )}
      </div>
    </TransactionsContainer>
  );
};