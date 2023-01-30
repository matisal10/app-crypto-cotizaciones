import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import useAxios from '../services/useAxios';
import Info from './Info';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment/moment';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const Chart = () => {
    // const [cryptos, setCryptos] = useState([]);
    const { id } = useParams();
    const { response } = useAxios(`coins/${id}/market_chart?vs_currency=usd&days=7`);

    // const getCryptos = async () => {
    //     const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
    //     const data = await res.json()
    //     setCryptos(data)
    // }

    // useEffect(() => {
    //     getCryptos()
    //     const interval = setInterval(() => {
    //         getCryptos()
    //     }, 10000)
    //     return () => clearInterval(interval)
    // }, []);



    if (!response) {

        return (
            <div className="wrapper-container mt-8">
                <h2>Loading...</h2>
            </div>
        )
    }

    const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: id.toLocaleUpperCase(),
            },
        },
        scales: {
            yAxes: {

                ticks: {
                    beginAtZero: true,
                    color: 'white',
                    fontSize: 12,
                }
            },
            xAxes: {

                ticks: {
                    beginAtZero: true,
                    color: 'white',
                    fontSize: 12,
                }
            },
        }
    }
    const data = {
        labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
        datasets: [
            {
                fill: true,
                data: coinChartData.map(val => val.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(39, 198, 245, 0.22)',
                yAxisID: 'yAxes',
                xAxisID: 'xAxes'
            }
        ]
    }

    return (
        <div>
            <Link className='text-decoration-none text-white' to="/">
                <button type="button" className="btn btn-dark mt-3">
                    Back
                </button>
            </Link>

            <div className='text-bg-dark card-text p-3 mt-5 rounded'>
                <div className=''>
                    <Info to={`/${id}`}></Info>

                </div>

                <Line options={options} data={data} />
            </div>
        </div>
    )


}


export default Chart;

