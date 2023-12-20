import React from "react";
import SingleProductArea from "../../components/SingleProductArea";
import { useParams } from "react-router-dom";
import { OfferProvider } from "../../contexts/OfferContext";

export const SingleProduct = (props) => {
  const { contractAddress, tokenId } = useParams();

  return (
    <OfferProvider contract={contractAddress} tokenId={tokenId}>
      <SingleProductArea {...props} />
    </OfferProvider>
  );
};
