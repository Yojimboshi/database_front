// src/hooks/useVirtualPool.ts
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VIRTUAL_POOL_URL = `${VITE_API_BASE_URL}/pools`;

export function useVirtualPool() {
    const [pool, setPool] = useState<any>({}); // This is for storing the details of a specific pool
    const [error, setError] = useState<string>('');
    const [loading, setLoadingState] = useState(false);

    const headers = {
        Authorization: `${sessionStorage.getItem('accessToken')}`
    };

    const handleError = (operation: string, error: any) => {
        let errorMessage;

        if (axios.isAxiosError(error)) {
            errorMessage = (error.response?.data as any)?.message || "An unknown error occurred.";
        } else {
            errorMessage = error.message || "An unknown error occurred.";
        }

        console.error(`Error ${operation}:`, errorMessage);
        setError(errorMessage);
    };

    // Admin specific actions
    const createNewPool = async (tokenA: string, tokenB: string, initialTokenAReserve: number, initialTokenBReserve: number) => {
        if (!tokenA || !tokenB || !initialTokenAReserve || !initialTokenBReserve) {
            throw new Error("Invalid parameters for creating pool");
        }

        try {
            setLoadingState(true);
            const response = await axios.post(`${VIRTUAL_POOL_URL}/create`, { tokenA, tokenB, initialTokenAReserve, initialTokenBReserve }, {
                headers
            });
            return response.data;
        } catch (error) {
            handleError("creating new pool", error);
        } finally {
            setLoadingState(false);
        }
    };

    // For reading K
    const readPoolK = async (tokenA: string, tokenB: string) => {
        if (!tokenA || !tokenB) {
            throw new Error("Both tokenA and tokenB are required");
        }

        try {
            setLoadingState(true);
            const response = await axios.get(`${VIRTUAL_POOL_URL}/k/${tokenA}/${tokenB}/read`, { headers });
            return response.data;
        } catch (error) {
            handleError("fetching K value", error);
        } finally {
            setLoadingState(false);
        }
    };

    const adjustPoolK = async (tokenA: string, tokenB: string, newTokenAReserve: number, newTokenBReserve: number) => {
        if (!tokenA || !tokenB || !newTokenAReserve || !newTokenBReserve) {
            throw new Error("Invalid parameters for adjusting K value");
        }

        try {
            setLoadingState(true);
            const response = await axios.put(`${VIRTUAL_POOL_URL}/k/${tokenA}/${tokenB}/modify`, {
                newTokenAReserve,
                newTokenBReserve
            }, { headers });
            return response.data;
        } catch (error) {
            handleError("adjusting K value", error);
        } finally {
            setLoadingState(false);
        }
    };

    const searchPool = async (tokenA?: string, tokenB?: string) => {
        try { 
            setLoadingState(true);

            // Build the query string based on the tokens provided
            let queryString = '';
            if (tokenA && tokenB) {
                queryString = `?tokenA=${tokenA}&tokenB=${tokenB}`;
            }

            // Fetch pools using the constructed query string
            const response = await axios.get(`${VIRTUAL_POOL_URL}/search${queryString}`, { headers });

            setPool(response.data);  // Setting the fetched pool details to state
            return response.data;
        } catch (error) {
            handleError("searching for pool", error);
        } finally {
            setLoadingState(false);
        }
    };

    const performSwap = async (tokenA: string, tokenB: string, amount: number, inputBox: string) => {
        if (!tokenA || !tokenB || !amount || !inputBox) {
            throw new Error("Invalid parameters for performing a swap");
        }
    
        try {
            setLoadingState(true);
            const response = await axios.post(`${VIRTUAL_POOL_URL}/${tokenA}/${tokenB}/swap`, {
                amount,
                inputBox
            }, { headers });

            return response.data;
        } catch (error) {
            handleError("performing a swap", error);
        } finally {
            setLoadingState(false);
        }
    };
    
    const addLiquidityToPool = async (tokenA: string, tokenB: string, amountADesired: number, amountBDesired: number) => {
        if (!tokenA || !tokenB || !amountADesired || !amountBDesired) {
            throw new Error("Invalid parameters for adding liquidity");
        }
    
        try {
            setLoadingState(true);
            const response = await axios.post(`${VIRTUAL_POOL_URL}/${tokenA}/${tokenB}/add-liquidity`, {
                amountADesired,
                amountBDesired
            }, { headers });
            return response.data;
        } catch (error) {
            handleError("adding liquidity", error);
        } finally {
            setLoadingState(false);
        }
    };
    
    const removeLiquidityFromPool = async (tokenA: string, tokenB: string, liquidityTokens: number, amountAMin: number, amountBMin: number) => {
        if (!tokenA || !tokenB || !liquidityTokens || !amountAMin || !amountBMin) {
            throw new Error("Invalid parameters for removing liquidity");
        }
    
        try {
            setLoadingState(true);
            const response = await axios.post(`${VIRTUAL_POOL_URL}/${tokenA}/${tokenB}/remove-liquidity`, {
                liquidityTokens,
                amountAMin,
                amountBMin
            }, { headers });
            return response.data;
        } catch (error) {
            handleError("removing liquidity", error);
        } finally {
            setLoadingState(false);
        }
    };
    

    const calculateAmountOut = async (tokenA: string, tokenB: string, inputAmount: number) => {
        try {
            setLoadingState(true);
            const response = await axios.post(`${VIRTUAL_POOL_URL}/${tokenA}/${tokenB}/amount-out`, { amountIn: inputAmount }, { headers });
            return response.data;
        } catch (error) {
            handleError("calculating amount out", error);
        } finally {
            setLoadingState(false);
        }
    };
    
    const calculateAmountIn = async (tokenA: string, tokenB: string, outputAmount: number) => {
        try {
            setLoadingState(true);
            const response = await axios.post(`${VIRTUAL_POOL_URL}/${tokenA}/${tokenB}/amount-in`, { amountOut: outputAmount }, { headers });
            return response.data;
        } catch (error) {
            handleError("calculating amount in", error);
        } finally {
            setLoadingState(false);
        }
    };
    

    const calculateAddLiquidityOutput = async (poolId: string) => {
        try {
            setLoadingState(true);
            const response = await axios.get(`${VIRTUAL_POOL_URL}/${poolId}/calculate-add-liquidity-output`, { headers });
            return response.data;
        } catch (error) {
            handleError("calculating add liquidity output", error);
        } finally {
            setLoadingState(false);
        }
    };

    const calculateRemoveLiquidityOutput = async (poolId: string) => {
        try {
            setLoadingState(true);
            const response = await axios.get(`${VIRTUAL_POOL_URL}/${poolId}/calculate-remove-liquidity-output`, { headers });
            return response.data;
        } catch (error) {
            handleError("calculating remove liquidity output", error);
        } finally {
            setLoadingState(false);
        }
    };

    const getSlippage = async (poolId: string) => {
        try {
            setLoadingState(true);
            const response = await axios.get(`${VIRTUAL_POOL_URL}/${poolId}/get-slippage`, { headers });
            return response.data;
        } catch (error) {
            handleError("getting slippage", error);
        } finally {
            setLoadingState(false);
        }
    };

    const quote = async (poolId: string) => {
        try {
            setLoadingState(true);
            const response = await axios.get(`${VIRTUAL_POOL_URL}/${poolId}/quote`, { headers });
            return response.data;
        } catch (error) {
            handleError("quoting", error);
        } finally {
            setLoadingState(false);
        }
    };

    const getLPTokenBalance = async (poolId: string) => {
        try {
            setLoadingState(true);
            const response = await axios.get(`${VIRTUAL_POOL_URL}/${poolId}/get-lp-token-balance`, { headers });
            return response.data;
        } catch (error) {
            handleError("getting LP token balance", error);
        } finally {
            setLoadingState(false);
        }
    };

    const getTotalLPTokenSupply = async (poolId: string) => {
        try {
            setLoadingState(true);
            const response = await axios.get(`${VIRTUAL_POOL_URL}/${poolId}/get-total-lp-token-supply`, { headers });
            return response.data;
        } catch (error) {
            handleError("getting total LP token supply", error);
        } finally {
            setLoadingState(false);
        }
    };

    const checkUserCryptoBalance = async (poolId: string) => {
        try {
            setLoadingState(true);
            const response = await axios.get(`${VIRTUAL_POOL_URL}/${poolId}/check-user-crypto-balance`, { headers });
            return response.data;
        } catch (error) {
            handleError("checking user crypto balance", error);
        } finally {
            setLoadingState(false);
        }
    };


    return {
        // State
        pool,
        error,
        loading,

        // Functions
        createNewPool,  // Admin
        adjustPoolK,    // Admin
        readPoolK,      // Admin
        // Common
        searchPool,
        performSwap,
        addLiquidityToPool,
        removeLiquidityFromPool,

        //quote
        calculateAmountOut,
        calculateAmountIn,
        calculateAddLiquidityOutput,
        calculateRemoveLiquidityOutput,
        getSlippage,
        quote,
        getLPTokenBalance,
        getTotalLPTokenSupply,
        checkUserCryptoBalance
    };
}
