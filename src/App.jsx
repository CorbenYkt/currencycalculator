import React, { useState, useEffect } from 'react';
import { CurrencyBlock } from './assets/currencyBlock';
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material';

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
    <>
      <Grid container spacing={0}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}
            py={'0rem'}><h2>Currency Calculator</h2>
          </Box>
          <Container>
            <CurrencyBlock value={fromPrice}
              currency={fromCurrency}
              onChangeCurrency={setfromCurrency}
              onChangeValue={onChangeFromPrice} />

            <CurrencyBlock value={toPrice}
              currency={toCurrency}
              onChangeCurrency={settoCurrency}
              onChangeValue={onChangeToPrice} />

            <Box component={'footer'} display={'flex'} flexDirection={'column'} alignItems={'center'}
              py={'0rem'}><br></br>
              <a href={'https://github.com/corbenykt'} style={{ fontWeight: 'normal', textDecorationLine: '' }} >
                By Dmitrii Artemev
              </a>
              <p style={{ fontSize: '0.75rem' }}>&copy; {(new Date().getFullYear())}</p>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
    </>
  )
}

export default App
