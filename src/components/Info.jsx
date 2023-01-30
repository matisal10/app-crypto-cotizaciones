import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import useAxios from '../services/useAxios';

const Info = () => {

    const { id } = useParams();
    // const res = useAxios(`coins/${id}` )
    // let data = res.response
    const { response } = useAxios(`coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);

    // console.log('lol',response)
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
    // if (!res) {
    //     return (
    //         <div className="wrapper-container mt-8">
    //             <h2>Loading...</h2>
    //         </div>
    //     )
    // }

    const formatNum = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    return (
        <div className='d-flex justify-content-between align-items-center'>

            <div className=' d-flex justify-content-center mb-3' >
                <img className='me-3' src={response.image.small} alt={response.name} />
                <h2 className='mt-1'>{response.name}</h2>
            </div>

            <h2 className='d-flex ms-4 text-info-emphasis' >$ {formatNum(response.market_data.current_price.usd)}</h2>
        </div>
    );
}

export default Info;
