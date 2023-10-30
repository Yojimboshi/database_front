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

  const testgetSpecificPool = async () => {
    const poolData = await getSpecificPool(poolId);
    console.log(poolData);
  }


  const testCalculateAmountOut = async () => {
    const AmountOut = await calculateAmountOut("2", 23);
    console.log(AmountOut);

  }


  // Handle Interface


  // Function to handle the function selection
  const handleFunctionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFunction(e.target.value);
  };

  // Function to handle parameter changes
  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };


  // Function to call the selected function with the provided parameters
  const callSelectedFunction = async () => {
    try {
      // Check for required parameters for the selected function
      if (selectedFunction === 'getSpecificPool' && !poolId) {
        throw new Error('Pool ID is required');
      }

      // Call the selected function with the parameters
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

      {/* Render input fields for the selected function */}
      {selectedFunction !== 'getSpecificPool' && (
        <div>
          <input
            type="text"
            name="tokenA"
            placeholder="Token A"
            value={params.tokenA}
            onChange={handleParamChange}
          />
          {/* Add input fields for other parameters as needed */}
        </div>
      )}

      <button onClick={callSelectedFunction}>Execute</button>
    </div>
  );
}


export default PoolManagement;