import React from "react";
import { CurrencyBlock } from './currencyBlock';
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
import { ConstructionOutlined, RateReview } from "@mui/icons-material";

export default function Currency() {
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


    return (
        <div>
            <CurrencyBlock value={fromPrice}
                currency={fromCurrency}
                onChangeCurrency={setfromCurrency}
                onChangeValue={onChangeFromPrice} />
                
            <CurrencyBlock value={toPrice}
                currency={toCurrency}
                onChangeCurrency={settoCurrency}
                onChangeValue={onChangeToPrice} />
        </div>
    );
}