import { useState, useEffect, createContext, useContext, useCallback } from 'react';

const PolPriceContext = createContext(null);

export const usePolPrice = () => {
  const context = useContext(PolPriceContext);
  return context || { eurPrice: null, usdPrice: null, loading: true, refreshing: false, refreshPrice: () => {}, lastUpdate: null };
};

export const PolPriceProvider = ({ children }) => {
  const [prices, setPrices] = useState({ eurPrice: null, usdPrice: null, loading: true, refreshing: false, lastUpdate: null });

  const fetchPrice = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setPrices(prev => ({ ...prev, refreshing: true }));
    }
    try {
      // Use our backend proxy to avoid CORS issues
      const backendUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${backendUrl}/api/pol-price`);
      const data = await response.json();
      
      if (data.eur && data.usd) {
        setPrices({
          eurPrice: data.eur,
          usdPrice: data.usd,
          loading: false,
          refreshing: false,
          lastUpdate: new Date()
        });
      } else {
        setPrices(prev => ({ ...prev, loading: false, refreshing: false }));
      }
    } catch (error) {
      console.error('Error fetching POL price:', error);
      setPrices(prev => ({ ...prev, loading: false, refreshing: false }));
    }
  }, []);

  const refreshPrice = useCallback(() => {
    fetchPrice(true);
  }, [fetchPrice]);

  useEffect(() => {
    fetchPrice();
    // Aggiorna ogni 60 secondi
    const interval = setInterval(() => fetchPrice(), 60000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  return (
    <PolPriceContext.Provider value={{ ...prices, refreshPrice }}>
      {children}
    </PolPriceContext.Provider>
  );
};

// Componente per mostrare il prezzo convertito
export const PriceDisplay = ({ polAmount, className = '' }) => {
  const { eurPrice, usdPrice, loading } = usePolPrice();

  if (loading || !eurPrice || !usdPrice) {
    return null;
  }

  const eurValue = (polAmount * eurPrice).toFixed(2);
  const usdValue = (polAmount * usdPrice).toFixed(2);

  return (
    <div className={`text-xs text-slate-500 ${className}`}>
      ≈ €{eurValue} / ${usdValue}
    </div>
  );
};

export default PolPriceProvider;
