import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getToken, getUsername, resetUserSession} from '../service/AuthService';
import axios from 'axios';
import TransactionList from "../components/TransactionList";
import DropDownMenu from "../components/DropDownMenu";

const transactionHistoryAPIUrl = 'https://3n3jjywto9.execute-api.us-east-2.amazonaws.com/prod/transactions/';

const TransactionHistory = (props) => {
    const username = getUsername();
    const navigate = useNavigate();
    const location = useLocation();
    const token = getToken();
    const [message, setMessage] = useState(null);

    const [queryAssetId, setQueryAssetId] = useState('ALL');
    const [transactions, setTransactions] = useState(null);

    const queryHandler = () => {
        const requestConfig = {
            headers: {
                'x-api-key': '9zsZhasE01a9hxGo92WUr68aGSvllMBN6Q3FHmBI',
                'cp-auth-token': token
            }
        }

        const urlString = transactionHistoryAPIUrl + username + '?assetFlag=' + (queryAssetId=='Select an Asset' ? 'ALL' : queryAssetId);
        console.log('Request config' + JSON.stringify(requestConfig));
        console.log(urlString);
        
        axios.get(urlString, requestConfig).then((response) => {
            console.log('Portfolio Received');
            console.log(response);
            setTransactions(response.data.transactions);
        }).catch((error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                resetUserSession();
                props.logout();
                navigate('/login');
            } else {
                setMessage(error.response.data.errorMessage.split('] ')[1]);
            }
        });
    }

    const backHandler = () => {
        navigate('/portfolio');
    }

    const logoutHandler = () => {
        resetUserSession();
        props.logout();
        navigate('/login');
    }
    return (
        <div>
            <div id="alignpage">
            <h5>Transaction History</h5>
            {username}'s portfolio <br/> <br/>
            {transactions &&
            <TransactionList transactions={transactions} assetMap={location.state.assetMap} />
            }
            Transaction Query <br/>
            </div>

            < DropDownMenu assets={location.state.assets} setAssetId={(e)=>setQueryAssetId(e)} /> <br/>

            <div id="outer">
                <input className="inner" type="button" value="Transaction Query" onClick={queryHandler} /> <br/>
                <input className="inner" type="button" value="Back to Portfolio" onClick={backHandler} /> <br/>
                <input className="inner" type="button" value="Logout" onClick={logoutHandler} />
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default TransactionHistory;
