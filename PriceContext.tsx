// PriceContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const PriceContext = createContext({});

export const PriceProvider = ({ children }) => {
  const [livePrices, setLivePrices] = useState({});

  useEffect(() => {
    const fetchInitialPrices = async () => {
      const { data } = await supabase.from('prices').select('*');
      if (data) {
        const priceMap = data.reduce((acc, price) => {
          acc[price.stock_symbol] = price;
          return acc;
        }, {});
        setLivePrices(priceMap);
      }
    };
    fetchInitialPrices();

    const channel = supabase
      .channel('prices-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'prices' },
        (payload) => {
          const newPrice = payload.new;
          if (newPrice && newPrice.stock_symbol) {
            setLivePrices(prevPrices => ({ ...prevPrices, [newPrice.stock_symbol]: newPrice }));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return <PriceContext.Provider value={{ livePrices }}>{children}</PriceContext.Provider>;
};

export const usePrices = () => useContext(PriceContext);
