import React, { useState, useEffect } from 'react';
import { CurrencyBlock } from './assets/currencyBlock';
import './App.css';

function App() {
  const [fromCurrency, setfromCurrency] = React.useState('NZD');
  const [toCurrency, settoCurrency] = React.useState('KZT');
  const [fromPrice, setfromPrice] = React.useState(1);
  const [toPrice, settoPrice] = React.useState(0);
  const ratesVar = React.useRef({});

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((json) => {
        ratesVar.current = json.rates;
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesVar.current[fromCurrency];
    const result = price * ratesVar.current[toCurrency];
    settoPrice(result.toFixed(3));
    setfromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = (ratesVar.current[fromCurrency] / ratesVar.current[toCurrency]) * value;
    setfromPrice(result.toFixed(3));
    settoPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Currency Calculator</h1>
        </div>
      </header>

      <main className="flex-grow container max-w-3xl mx-auto p-4 flex flex-col items-center">
        <section aria-labelledby="from-currency-section" className="w-full">
          <h2 id="from-currency-section" className="text-xl text-center">From Currency</h2>
          <CurrencyBlock
            value={fromPrice}
            currency={fromCurrency}
            onChangeCurrency={setfromCurrency}
            onChangeValue={onChangeFromPrice}
          />
        </section>

        <span className="block h-6" />

        <section aria-labelledby="to-currency-section" className="w-full">
          <h2 id="to-currency-section" className="text-xl text-center">To Currency</h2>
          <CurrencyBlock
            value={toPrice}
            currency={toCurrency}
            onChangeCurrency={settoCurrency}
            onChangeValue={onChangeToPrice}
          />
        </section>
      </main>

      <footer className="container max-w-3xl mx-auto text-center py-4">
        <div className="text-sm text-gray-500">
          <h6>Email: <a href="mailto:vool34@gmail.com" className="hover:text-gray-200 transition">vool34@gmail.com</a></h6>
        </div>
        <div className="text-sm text-gray-500">
          <h6>GitHub: <a href="https://github.com/corbenykt" className="hover:text-gray-100 transition">github.com/corbenykt</a></h6>
        </div>
        <div className="text-sm text-gray-500">
          <h6>LinkedIn: <a href="https://www.linkedin.com/in/dmitrii-artemev/" className="hover:text-gray-100 transition">Dmitrii Artemev</a></h6>
        </div>
      </footer>
    </div>

  )
}

export default App
