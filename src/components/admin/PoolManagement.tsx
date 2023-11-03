// src/components/announcement/AnnouncementManager.tsx
import React, { useState } from 'react';
import { useVirtualPool } from '../../hooks/useVirtualPool';
import Slider from 'react-slider';
import "./PoolManagement.css";
interface Props {
  isAdmin: boolean;
}

function PoolManagement({ isAdmin }: Props) {
  const [selectedFunction, setSelectedFunction] = useState('createNewPool');
  const [sliderValue, setSliderValue] = useState(0);
  const [params, setParams] = useState<{ [key: string]: string }>({});
  const functionParams: Record<string, string[]> = {
    createNewPool: ['tokenA', 'tokenB', 'initialTokenAReserve', 'initialTokenBReserve'],
    readPoolK: ['tokenA', 'tokenB'],
    adjustPoolK: ['tokenA', 'tokenB', 'newTokenAReserve', 'newTokenBReserve'],
    searchPool: ['tokenA', 'tokenB'],
    performSwap: ['tokenA', 'tokenB', 'amount', 'inputBox'],
    addLiquidityToPool: ['tokenA', 'tokenB', 'amountADesired', 'amountBDesired'],
    removeLiquidityFromPool: ['tokenA', 'tokenB', 'liquidityTokens', 'amountAMin', 'amountBMin'],
    calculateAmountOut: ['tokenA', 'tokenB', 'InputAmount'],
    calculateAmountIn: ['tokenA', 'tokenB', 'OutputAmount'],
    calculateAddLiquidityOutput: ['tokenA', 'tokenB', 'reserveA', 'reserveB', 'amountA'],
    calculateRemoveLiquidityOutput: ['tokenA', 'tokenB', 'reserveA', 'reserveB', 'totalLPTokenSupply', 'liquidityTokens'],
    getSlippage: [],
    quote: [],
    getLPTokenBalance: ['tokenA', 'tokenB'],
    getTotalLPTokenSupply: ['tokenA', 'tokenB'],
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
      if (name === 'amount') {
        setSliderValue(parseFloat(value));
      }
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
          displayData = await searchPool(params.tokenA, params.tokenB);
          console.log(displayData.pools[0]);
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
          displayData = await calculateAmountOut(params.tokenA, params.tokenB, parseFloat(params.InputAmount));
          console.log(displayData);
          break;
        case 'calculateAmountIn':
          displayData = await calculateAmountIn(params.tokenA, params.tokenB, parseFloat(params.OutputAmount));
          console.log(displayData);
          break;
        case 'calculateAddLiquidityOutput':
          await calculateAddLiquidityOutput(params.tokenA, params.tokenB, parseFloat(params.reserveA), parseFloat(params.reserveB), parseFloat(params.amountA))
          break;
        case 'calculateRemoveLiquidityOutput':
          await calculateRemoveLiquidityOutput(params.tokenA, params.tokenB, parseFloat(params.reserveA), parseFloat(params.reserveB), parseFloat(params.totalLPTokenSupply), parseFloat(params.liquidityTokens))
          break;
        case 'getSlippage':
          await getSlippage()
          break;
        case 'quote':
          await quote()
          break;
        case 'getLPTokenBalance':
          displayData = await getLPTokenBalance(params.tokenA, params.tokenB)
          console.log(displayData);
          break;
        case 'getTotalLPTokenSupply':
          displayData = await getTotalLPTokenSupply(params.tokenA, params.tokenB)
          console.log(displayData);
          break;
        case 'checkUserCryptoBalance':
          await checkUserCryptoBalance();
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
      <div className="flex">
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
          param === 'amount' || param === 'amountADesired' || param === 'amountBDesired' || param === 'liquidityTokens' ? (
            <div key={param} className="m-2">
              <input
                type="text"
                name={param}
                placeholder={param}
                value={params[param] || ''}
                onChange={handleParamChange}
                className="p-2 border rounded-md m-2"
              />
              <div className="shared-track">
                <Slider
                  min={0}
                  max={10000}
                  step={1}
                  value={sliderValue}
                  onChange={(value) => {
                    setSliderValue(value);
                    setParams({ ...params, [param]: value.toString() });
                  }}
                  className="w-full px-3 py-2 rounded-md bg-green-100 text-blue-600" // Common class for shared track
                />
              </div>
            </div>
          ) : (
            <input
              key={param}
              type="text"
              name={param}
              placeholder={param}
              value={params[param] || ''}
              onChange={handleParamChange}
              className="p-2 border rounded-md m-2"
            />
          )
        ))}
      </div>
      <button onClick={callSelectedFunction} className="p-2 border rounded-md m-2 self-end">
        Execute
      </button>
    </div>
  );

}


export default PoolManagement;