import { Button } from '@/components/ui/button'
import { fetchMarketChart } from '@/State/Coin/Action'
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { useParams } from 'react-router-dom'

const timeSeries = [
    {
        keyword:"DIGITAL_CURRENCY_DAILY",
        key:"Time Series (Daily)",
        lable:"1 Day",
        value: 1
    },
    {
        keyword:"DIGITAL_CURRENCY_WEEKLY",
        key:"Weekly Time Series",
        lable:"1 Week",
        value: 7
    },
    {
        keyword:"DIGITAL_CURRENCY_MONTHLY",
        key:"Monthly Time Series",
        lable:"1 Month",
        value: 30
    },
]

const StockChart = ({coinId}) => {

    const dispatch = useDispatch()

    const {coin} = useSelector(store => store)

    const [activeLable, setActiveLable] = useState("1 Day")
       
    const searies = [
        {
            //data:[]
            data:coin.marketChart.data
        }
    ]

    const option = {
        chart:{
            id:"area-datatime",
            type:"area",
            height:350,
            zoom:{
                autoScaleYaxis:true
            }
        },
        dataLables:{
            ebabled:false
        },
        xaxis:{
            type:"datatime",
            tickAmount:6
        },
        colors:["#758AA2"],
        markers:{
            colors:["#fff"],
            strokeColor:"#fff",
            size:0,
            strokeWidth:1,
            style:"hollow"
        },
        tooltip:{
            theme:"dark"
        },
        fill:{
            type:"gradient",
            gradient:{
                shadeIntensity:1,
                opacityFrom:0.7,
                opacityTo:0.8,
                stops:[0,100]
            }
        },
        grid:{
            borderColor:"#47535E",
            strokeDashArray:4,
            show:true
        }
    }

    const handleActiveLable = (value) => {
        setActiveLable(value);
    }

    useEffect(() => {
        dispatch(fetchMarketChart({coinId: coinId, days: 30, jwt:localStorage.getItem("jwt")}));
    }, [dispatch, coinId, activeLable])

  return (
    <div>
        <div className='space-x-3'>
            {timeSeries.map((item) => <Button 
            variant={activeLable==item.lable?"":"outline"}
            onClick={()=>handleActiveLable(item.lable)} 
            key={item.lable}>
                    {item.lable}
                </Button>)}
        </div>
        <div id="chart-timelines">
            <ReactApexChart
             options={option} 
             series={searies}
             type='area'/>
        </div>
    </div>
  )
}

export default StockChart