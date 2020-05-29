import React from 'react';
import 'tachyons';
import 'bulma/css/bulma.css';
import { Jumbotron } from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class GetTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           data:null,
           tid: null
        }
        this.onClickingView=this.onClickingView.bind(this);
    }

    async componentDidMount() {
        this.getUser();
    }

    getUser = async () => { 
        const ip = process.env.REACT_APP_IP
        console.log('hd',ip);  
        await fetch(`http://${ip}:3001/getUser`)
      .then(response => response.json())
      .then(data => {
          console.log(data)
        this.setState({ data })
        this.props.onClickingView({data: this.state.data});
        });
    }


    onClickingView = async (id) => {  
        this.getUser();
        this.props.onRouteChange('logs');
    }

    onCompensate = async () => {
        const ip = process.env.REACT_APP_IP
        const { data } = this.state
        if(data!==null) {
            console.log(data.uid)
            await fetch(`http://${ip}:3001/compensate`)
        .then(response => response.json())
        .then(data => {
            this.getUser();
            });
        }
    }

    onInputChange = (event) => {
        this.setState({ tid: event.target.value });
    }

    render() {
        return(
                <Jumbotron>
                    <h1>Welcome to the hyperledger network</h1>
                    <p className='pa4'>Lets you access logs</p>
                    <Button variant='success' onClick={() => this.onClickingView('')}>Click here</Button>
                    <Button variant='success' onClick={() => this.onCompensate()}>Compensate</Button>
                </Jumbotron>
        );
        
    }
}

export default GetTransaction;
