// src/components/announcement/AnnouncementManager.tsx
import React, { useState } from 'react';
import { useVirtualPool } from '../../hooks/useVirtualPool';

function PoolManagement() {
  const [poolId, setPoolId] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('getSpecificPool');
  const [displayData, setDisplayData] = useState([]);
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
    try{
      const { name, value } = e.target;
      setParams({ ...params, [name]: value });
    }catch(error){
      throw new Error('Invalid input');
    }

  };



  const callSelectedFunction = async () => {
    try {
      if (selectedFunction === 'getSpecificPool' && !poolId) {
        throw new Error('Pool ID is required');
      }
      let displayData;
      switch (selectedFunction) {
        case 'getSpecificPool':
          await getSpecificPool(poolId);
          break;
        case 'performSwap':
          displayData = await performSwap(poolId, params.tokenA, params.tokenB, params.amount, params.inputBox);
          console.log(displayData);
          break;
        case 'addLiquidityToPool':
          displayData = await addLiquidityToPool(poolId, params.tokenA, params.tokenB, params.amountADesired, params.amountBDesired);
          console.log(displayData);
          break;
        case 'removeLiquidityFromPool':
          displayData = await removeLiquidityFromPool(poolId, params.tokenA, params.tokenB, params.liquidityTokens, params.amountAMin, params.amountBMin);
          console.log(displayData);
          break;
        default:
          throw new Error('Invalid function selection');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Enter Pool ID"
          value={poolId}
          onChange={(e) => setPoolId(e.target.value)}
          className="p-2 border rounded-md m-2"
        />
        <select value={selectedFunction} onChange={handleFunctionChange} className="p-2 border rounded-md m-2">
          <option value="getSpecificPool">Get Specific Pool</option>
          <option value="performSwap">Perform Swap</option>
          <option value="addLiquidityToPool">Add Liquidity to Pool</option>
          <option value="removeLiquidityFromPool">Remove Liquidity from Pool</option>
        </select>
      </div>

      <div>
        {selectedFunction !== 'getSpecificPool' && (
          <div>
            <input
              type="text"
              name="tokenA"
              placeholder="Token A"
              value={params.tokenA}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />
            <input
              type="text"
              name="tokenB"
              placeholder="Token B"
              value={params.tokenB}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />
          </div>
        )}

        {selectedFunction === 'performSwap' && (
          <div>
            <input
              type="text"
              name="amount"
              placeholder="amount"
              value={params.amount}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />

            <input
              type="text"
              name="inputBox"
              placeholder="inputBox"
              value={params.inputBox}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />
          </div>

        )}
        {selectedFunction === 'addLiquidityToPool' && (
          <div>
            <input
              type="text"
              name="amountADesired"
              placeholder="AmountA Desired"
              value={params.amountADesired}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />

            <input
              type="text"
              name="amountBDesired"
              placeholder="AmountB Desired"
              value={params.amountBDesired}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />
          </div>

        )}
        {selectedFunction === 'removeLiquidityFromPool' && (
          <div>
            <input
              type="text"
              name="liquidityTokens"
              placeholder="Liquidity Tokens"
              value={params.liquidityTokens}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />

            <input
              type="text"
              name="amountAMin"
              placeholder="AmountA Min"
              value={params.amountAMin}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />
            <input
              type="text"
              name="amountBMin"
              placeholder="AmountB Min"
              value={params.amountBMin}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />

          </div>

        )}
      </div>

      <button onClick={callSelectedFunction} className="p-2 border rounded-md m-2 self-end">
        Execute
      </button>
    </div>
  );

}


export default PoolManagement;