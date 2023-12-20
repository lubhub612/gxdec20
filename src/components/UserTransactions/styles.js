import styled from "styled-components";

export const TransactionsContainer = styled.div`
  .transaction-area-body {
    width: 100%;
    padding: 10px 8%;
  }
  .transaction-area-body table {
    width: 100%;
    color: var(--text-color);
    border-collapse: collapse;
    text-align: left;
    font-weight: 700;
  }

  .transaction-area-body table thead th {
    color: var(--button-hover-bg);
    font-weight: 400;
    height: 50px;
  }

  .transaction-area-body tbody td {
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 20px 0;
  }

  .transaction-area-body table tbody td span {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .transaction-area-body table tbody td span svg {
    height: auto;
    width: 10px;
  }

  .transaction-area-body tbody strong {
    font-weight: 400;
    font-size: 12px;
  }
  .transaction-area-body tbody strong.red {
    color: #e64951;
  }
  .transaction-area-body tbody strong.green {
    color: #0bb04f;
  }
  .transaction-area-body tbody strong.ash {
    color: #8a8c95;
  }
  .transaction-area-body tbody tr td:nth-child(2) span svg {
    width: 18px;
    color: #4589ff;
  }

  .transaction-area-body tbody tr td:nth-child(2) {
    max-width: 130px;
  }
  .transaction-area-body tbody tr td img {
    height: auto;
    width: 40px;
    border-radius: 50px;
  }
  .transaction-area-body tbody tr {
    transition: 0.3s;
  }
  //   .transaction-area-body tbody tr:hover {
  //     background: var(--tab-hover);
  //     cursor: pointer;
  //   }
  h2 {
    color: var(--text-color);
    text-align: center;
    font-size: 50px;
    margin: 0;
  }
  h4 {
    color: var(--text-color);
    text-align: center;
    font-size: 16px;
    margin: 0;
  }
  .header {
    padding: 30px 0px;
  }
`;
