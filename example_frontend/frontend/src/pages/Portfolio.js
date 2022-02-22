import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getToken, getUsername, resetUserSession} from '../service/AuthService';
import coinGecko from "../apis/coinGecko";
import axios from 'axios';
import PortfolioList from "../components/PortfolioList";
import PortfolioChart from "../components/PortfolioChart";

const portfolioAPIUrl = 'https://ccixqpmq4c.execute-api.us-east-2.amazonaws.com/prod/portfolio/';

const Portfolio = (props) => {
    const username = getUsername();
    const navigate = useNavigate();
    const token = getToken();
    const [message, setMessage] = useState(null);

    const masterList = [
        "bitcoin", "ethereum", "tether",
        "binancecoin", "usd-coin", "ripple",
        "cardano", "solana", "avalanche-2",
        "terra-luna", "polkadot", "dogecoin",
        "binance-usd", "shiba-inu", "matic-network",
        "crypto-com-chain", "terrausd", "wrapped-bitcoin",
        "dai", "cosmos", "litecoin",
        "chainlink", "near", "tron",
        "ftx-token", "algorand", "bitcoin-cash",
        "staked-ether", "okb", "stellar",
        "leo-token", "fantom", "uniswap",
        "decentraland", "hedera-hashgraph", "internet-computer",
        "the-sandbox", "axie-infinity", "ethereum-classic",
        "elrond-erd-2", "vechain", "theta-token",
        "filecoin", "ecomi", "tezos",
        "klay-token", "monero", "compound-ether",
        "cdai", "the-graph"
    ];

    // store data
    const [assets, setAssets] = useState(null);
    const [assetMap, setAssetMap] = useState(null);
    const [assetQuantityMap, setAssetQuantityMap] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect preform task when component mounts
    useEffect(() => {
        // Fetching data for asset details that is returned in map
        const fetchData = async () => {
            setIsLoading(true);
            const response = await coinGecko.get("/coins/markets/", {
                // Params used in coinGecko API
                params: {
                    vs_currency: "usd",
                    ids: masterList.join(","),
                },
            });

            setAssets(response.data);
            setAssetMap(Object.fromEntries(response.data.map(asset => [asset.id, asset])));
            setIsLoading(false);
        };
        fetchData();
    },[]);

    useEffect(() => {
        const requestConfig = {
            headers: {
                'x-api-key': '9zsZhasE01a9hxGo92WUr68aGSvllMBN6Q3FHmBI',
                'cp-auth-token': token
            }
        }

        console.log('Request config' + JSON.stringify(requestConfig));
        
        axios.get(portfolioAPIUrl + username, requestConfig).then((response) => {
            console.log('Portfolio Received');
            console.log(response);
            setAssetQuantityMap(response.data.portfolio.assetQuantityMap);
        }).catch((error) => {
            console.log('Error ' + error);
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Server is down, please try again later');
            }
        })
    },[]);

    const createHandler = () => {
        console.log(assets);
        console.log(assetMap);
        navigate('/createPortfolio', {state : {assets:assets, assetMap:assetMap}});
    }

    const updateHandler = () => {
        navigate('/updatePortfolio', {state : assets});
    }

    const logoutHandler = () => {
        resetUserSession();
        props.logout();
        navigate('/login');
    }
    return (
        <div className="coinsummary shadow border p-2 rounded mt-2 bg-light">
            Hello {username}, you have been successfully logged in. <br/> <br/>
                {username}'s portfolio <br/> <br/>
            $ Total Portfolio Value <br/>
            {(assets && assetQuantityMap) ?
            <PortfolioList assets={assets.filter(asset => assetQuantityMap[asset.id])} assetQuantityMap={assetQuantityMap} />:
            <div>Loading...</div>}
            {(assets && assetQuantityMap) &&
            <PortfolioChart assets={assets.filter(asset => assetQuantityMap[asset.id])} assetQuantityMap={assetQuantityMap} />} 
            <input type="button" value="Create Portfolio" onClick={createHandler} /> <br/>
            <input type="button" value="Update Portfolio" onClick={updateHandler} /> <br/>
            <input type="button" value="Logout" onClick={logoutHandler} />
        </div>
    )
}

export default Portfolio;