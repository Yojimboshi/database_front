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
            const response = await axios.post(`${VIRTUAL_POOL_URL}`, { tokenA, tokenB, initialTokenAReserve, initialTokenBReserve }, {
                headers
            });
            return response.data;
        } catch (error) {
            handleError("creating new pool", error);
        } finally {
            setLoadingState(false);
        }
    };

    const adjustPoolK = async (tokenA: string, tokenB: string, newTokenAReserve: number, newTokenBReserve: number) => {
        if (!tokenA || !tokenB || !newTokenAReserve || !newTokenBReserve) {
            throw new Error("Invalid parameters for adjusting K value");
        }
        // ... rest of the function
    };

    const getSpecificPool = async (poolId: string | number) => {
        if (!poolId) {
            throw new Error("Pool ID is required");
        }
        // ... rest of the function
    };

    const performSwap = async (tokenA: string, tokenB: string, amount: number, inputBox: string) => {
        if (!tokenA || !tokenB || !amount || !inputBox) {
            throw new Error("Invalid parameters for performing a swap");
        }
        // ... rest of the function
    };

    const addLiquidityToPool = async (tokenA: string, tokenB: string, amountADesired: number, amountBDesired: number) => {
        if (!tokenA || !tokenB || !amountADesired || !amountBDesired) {
            throw new Error("Invalid parameters for adding liquidity");
        }
        // ... rest of the function
    };

    const removeLiquidityFromPool = async (tokenA: string, tokenB: string, liquidityTokens: number, amountAMin: number, amountBMin: number) => {
        if (!tokenA || !tokenB || !liquidityTokens || !amountAMin || !amountBMin) {
            throw new Error("Invalid parameters for removing liquidity");
        }
        // ... rest of the function
    };

    return {
        // State
        pool,
        error,
        loading,

        // Functions
        createNewPool,  // Admin
        adjustPoolK,    // Admin

        // Common
        getSpecificPool,
        performSwap,
        addLiquidityToPool,
        removeLiquidityFromPool
    };
}
