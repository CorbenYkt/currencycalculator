import React from 'react';

const defaultCurrencies = ['USD', 'KZT', 'NZD'];

export const CurrencyBlock = ({ value, currency, onChangeValue, onChangeCurrency }) => (
    <div className="block">
        <ul className="currencies">
            {defaultCurrencies.map((cur) => (
                <li
                    onClick={() => onChangeCurrency(cur)}
                    className={currency === cur ? 'active' : ''}
                    key={cur}>
                    {cur}
                </li>
            ))}
        </ul>
        <input
            onChange={(e) => onChangeValue(e.target.value)}
            value={value}
            type="number"
            placeholder={0} />
        <br></br><br></br>
    </div>
);