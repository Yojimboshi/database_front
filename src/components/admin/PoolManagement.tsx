// src/components/announcement/AnnouncementManager.tsx
import React, { useState } from 'react';
import { useVirtualPool } from '../../hooks/useVirtualPool';

interface Props {
  isAdmin: boolean;
}

function PoolManagement({ isAdmin }: Props) {
  const [poolId, setPoolId] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('createNewPool');
  const [params, setParams] = useState<{ [key: string]: string }>({});
  const functionParams: Record<string, string[]> = {
    createNewPool: ['tokenA', 'tokenB', 'initialTokenAReserve', 'initialTokenBReserve'],
    readPoolK: ['tokenA', 'tokenB'],
    adjustPoolK: ['tokenA', 'tokenB','newTokenAReserve', 'newTokenBReserve'],
    searchPool: ['DUMMY', 'USDT'],
    performSwap: ['tokenA', 'tokenB', 'amount', 'inputBox'],
    addLiquidityToPool: ['tokenA', 'tokenB', 'amountADesired', 'amountBDesired'],
    removeLiquidityFromPool: ['tokenA', 'tokenB', 'liquidityTokens', 'amountAMin', 'amountBMin'],
    calculateAmountOut: ['InputAmount'],
    calculateAmountIn: ['OutputAmount'],
    calculateAddLiquidityOutput: [],
    calculateRemoveLiquidityOutput: [],
    getSlippage: [],
    quote: [],
    getLPTokenBalance: [],
    getTotalLPTokenSupply: [],
    checkUserCryptoBalance: [],
  };

  const {
    createNewPool,
    readPoolK,
    adjustPoolK,
    searchPool,
    performSwap,
    addLiquidityToPool,
    removeLiquidityFromPool,
    calculateAmountOut,
    calculateAmountIn,
    calculateAddLiquidityOutput,
    calculateRemoveLiquidityOutput,
    getSlippage,
    quote,
    getLPTokenBalance,
    getTotalLPTokenSupply,
    checkUserCryptoBalance
  } = useVirtualPool();

  // Handle Interface


  const handleFunctionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFunction(e.target.value);
  };

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.target;
      setParams({ ...params, [name]: value });
    } catch (error) {
      throw new Error('Invalid input');
    }

  };


  const callSelectedFunction = async () => {
    try {
      let displayData;
      switch (selectedFunction) {
        case 'createNewPool':
          await createNewPool(params.tokenA, params.tokenB, parseFloat(params.initialTokenAReserve), parseFloat(params.initialTokenBReserve));
          break;
        case 'readPoolK':
          displayData = await readPoolK(params.tokenA, params.tokenB);
          console.log(displayData);
          break;
        case 'adjustPoolK':
          displayData = await adjustPoolK(params.tokenA, params.tokenB, parseFloat(params.newTokenAReserve), parseFloat(params.newTokenBReserve));
          console.log(displayData);
          break;
        case 'searchPool':
          await searchPool("ETH","DAI");
          break;
        case 'performSwap':
          displayData = await performSwap(params.tokenA, params.tokenB, parseFloat(params.amount), params.inputBox);
          console.log(displayData);
          break;
        case 'addLiquidityToPool':
          displayData = await addLiquidityToPool(params.tokenA, params.tokenB, parseFloat(params.amountADesired), parseFloat(params.amountBDesired));
          console.log(displayData);
          break;
        case 'removeLiquidityFromPool':
          displayData = await removeLiquidityFromPool(params.tokenA, params.tokenB, parseFloat(params.liquidityTokens), parseFloat(params.amountAMin), parseFloat(params.amountBMin));
          console.log(displayData);
          break;
        case 'calculateAmountOut':
          await calculateAmountOut(params.tokenA, params.tokenB, parseFloat(params.InputAmount));
          break;
        case 'calculateAmountIn':
          await calculateAmountIn(params.tokenA, params.tokenB, parseFloat(params.OutputAmount));
          break;
        case 'calculateAddLiquidityOutput':
          await calculateAddLiquidityOutput(poolId)
          break;
        case 'calculateRemoveLiquidityOutput':
          await calculateRemoveLiquidityOutput(poolId)
          break;
        case 'getSlippage':
          await getSlippage(poolId)
          break;
        case 'quote':
          await quote(poolId)
          break;
        case 'getLPTokenBalance':
          await getLPTokenBalance(poolId)
          break;
        case 'getTotalLPTokenSupply':
          await getTotalLPTokenSupply(poolId)
          break;
        case 'checkUserCryptoBalance':
          await checkUserCryptoBalance()
          break;

        default:
          throw new Error('Invalid function selection');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between items-center">
      <div className="flex justify-between">
        {selectedFunction !== 'getAllPools' && (
          <input
            type="text"
            placeholder="Enter Pool ID"
            value={poolId}
            onChange={(e) => setPoolId(e.target.value)}
            className="p-2 border rounded-md m-2"
          />
        )}
        <select value={selectedFunction} onChange={handleFunctionChange} className="p-2 border rounded-md m-2">
          {isAdmin && (
            <>
              <option value="createNewPool">Create new pool</option>
              <option value="readPoolK">Read Pool K</option>
              <option value="adjustPoolK">Adjust Pool K</option>
            </>
          )}
          <option value="searchPool">Search Pool</option>
          <option value="performSwap">Perform Swap</option>
          <option value="addLiquidityToPool">Add Liquidity to Pool</option>
          <option value="removeLiquidityFromPool">Remove Liquidity from Pool</option>
          <option value="calculateAmountOut">Calculate Amount Out</option>
          <option value="calculateAmountIn">Calculate Amount In</option>
          <option value="calculateAddLiquidityOutput">Calculate Add Liquidity Output</option>
          <option value="calculateRemoveLiquidityOutput">Calculate Remove Liquidity Output</option>
          <option value="getSlippage">Get Slippage</option>
          <option value="quote">Quote</option>
          <option value="getLPTokenBalance">Get LP Token Balance</option>
          <option value="getTotalLPTokenSupply">Get Total LP Token</option>
          <option value="checkUserCryptoBalance">Check User Balance</option>


        </select>
      </div>

        <div>
          {functionParams[selectedFunction].map((param) => (
            <input
              key={param}
              type="text"
              name={param}
              placeholder={param}
              value={params[param] || ''}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />
          ))}
        </div>

      <button onClick={callSelectedFunction} className="p-2 border rounded-md m-2 self-end">
        Execute
      </button>
    </div>
  );

}


export default PoolManagement;