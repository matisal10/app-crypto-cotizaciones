import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Currencies = () => {

    let data = []
    const [cryptos, setCryptos] = useState([]);

    const getCryptos = async () => {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false","/name,/current_price,/market_cap,/price_change,/total_volume,/high_24h,/low_24h`)
        data = await res.json()
        setCryptos(data)
    }

    useEffect(() => {
        getCryptos()
        const interval = setInterval(() => {
            getCryptos()
        }, 10000)
        return () => clearInterval(interval)
    }, []);

    const formatNum = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    return (
        <div>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">24%</th>
                        <th scope="col">Market Cap</th>
                    </tr>
                </thead>
                {
                    cryptos.map(({ name, image, market_cap, current_price, market_cap_rank, price_change_percentage_24h, symbol, id }, index) => (
                        <tbody>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td >
                                    <img src={image} alt="" className='me-3' style={{ 'height': '25px', 'width': '25px' }} />
                                    <Link to={`/${id}`} key='id' image={image} current_price={current_price} >{name}</Link>
                                    <span className=' ms-4 text-secondary text-uppercase'>{symbol}</span></td>
                                <td>$ {formatNum(current_price)}{ }</td>
                                <td className={price_change_percentage_24h > 0 ? 'text-success' : 'text-danger-emphasis'}>{price_change_percentage_24h} %</td>
                                <td>$ {formatNum(market_cap)}</td>
                            </tr>
                        </tbody>
                    ))
                }

            </table>
        </div>
    );
}

export default Currencies;
