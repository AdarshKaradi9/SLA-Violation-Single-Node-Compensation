import React from 'react';
import LogsList from '../LogsList/LogsList';
import Admin from '../Admin/Admin';
import {Jumbotron} from 'react-bootstrap';

const ViewTransaction = ({user,currentUser}) => {
    console.log('from view',currentUser)
        if(currentUser==='admin') {
            return(
                <Jumbotron>
                    <Admin transactionData={user} />  
                </Jumbotron>
            ); 
        }
        else {
            return(
                <Jumbotron>
                    <LogsList transactionData={user} />  
                </Jumbotron>
            ); 
        }
}
export default ViewTransaction;
