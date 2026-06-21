import React, { createContext, useContext, useState } from 'react';

type OrderContextType = {
  orderPlaced: boolean;
  setOrderPlaced: (value: boolean) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  return (
    <OrderContext.Provider
      value={{
        orderPlaced,
        setOrderPlaced,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrder must be used inside OrderProvider');
  }

  return context;
};