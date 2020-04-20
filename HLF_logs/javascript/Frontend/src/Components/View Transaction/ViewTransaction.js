import React from 'react';
import LogsList from '../LogsList/LogsList';
import {Jumbotron} from 'react-bootstrap';

const ViewTransaction = ({isTransactionData,transactionData}) => {
    if(isTransactionData) {
        console.log("From View",transactionData)
      return(
        <Jumbotron>
            <LogsList transactionData={transactionData} />  
        </Jumbotron>
    );  
    } else 
    {
        return (
            <div></div>
        )
    }
    
}

export default ViewTransaction;
