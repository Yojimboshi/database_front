// src/components/announcement/AnnouncementManager.tsx
import React, { useState } from 'react';
import { useVirtualPool } from '../../hooks/useVirtualPool';

function PoolManagement() {
  const [poolId, setPoolId] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('getSpecificPool');
  const [params, setParams] = useState({
    tokenA: '',
    tokenB: '',
    amount: 0,
    inputBox: '',
    amountADesired: 0,
    amountBDesired: 0,
    liquidityTokens: 0,
    amountAMin: 0,
    amountBMin: 0,
  });
  const {
    getSpecificPool,
    performSwap,
    addLiquidityToPool,
    removeLiquidityFromPool,
    calculateAmountOut,
  } = useVirtualPool();

  // Handle Interface


  const handleFunctionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFunction(e.target.value);
  };

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };



  const callSelectedFunction = async () => {
    try {
      if (selectedFunction === 'getSpecificPool' && !poolId) {
        throw new Error('Pool ID is required');
      }

      switch (selectedFunction) {
        case 'getSpecificPool':
          await getSpecificPool(poolId);
          break;
        case 'performSwap':
          await performSwap(poolId, params.tokenA, params.tokenB, params.amount, params.inputBox);
          break;
        case 'addLiquidityToPool':
          await addLiquidityToPool(poolId, params.tokenA, params.tokenB, params.amountADesired, params.amountBDesired);
          break;
        case 'removeLiquidityFromPool':
          await removeLiquidityFromPool(poolId, params.tokenA, params.tokenB, params.liquidityTokens, params.amountAMin, params.amountBMin);
          break;
        default:
          throw new Error('Invalid function selection');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pool ID"
        value={poolId}
        onChange={(e) => setPoolId(e.target.value)}
      />

      <select value={selectedFunction} onChange={handleFunctionChange}>
        <option value="getSpecificPool">Get Specific Pool</option>
        <option value="performSwap">Perform Swap</option>
        <option value="addLiquidityToPool">Add Liquidity to Pool</option>
        <option value="removeLiquidityFromPool">Remove Liquidity from Pool</option>
      </select>

      {selectedFunction !== 'getSpecificPool' && (
        <div>
          <input
            type="text"
            name="tokenA"
            placeholder="Token A"
            value={params.tokenA}
            onChange={handleParamChange}
          />
          <input
            type="text"
            name="tokenB"
            placeholder="Token B"
            value={params.tokenB}
            onChange={handleParamChange}
          />
        </div>
      )}

      <button onClick={callSelectedFunction}>Execute</button>
    </div>
  );
}


export default PoolManagement;