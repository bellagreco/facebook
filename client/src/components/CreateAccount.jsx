import React from 'react';
import axios from 'axios';

class CreateAccount extends React.Component {

    state = {
        name: '',
        lastname: '', 
        email: '',
        password: ''
    }

    componentDidMount = () => {

        axios.get('http://localhost:3001/getUsers')
            .then(res => {
                console.log(res, ' isabella')
            });
    };

    getName = (event) => {
        this.setState({name: event.target.value })
        console.log(event.target.value)
    }

    getLastname = (event) => {
        this.setState({lastname: event.target.value })
        console.log(event.target.value)
    }

    getEmail = (event) => {
        this.setState({email: event.target.value })
        console.log(event.target.value)
    }

    getPassword = (event) => {
        this.setState({password: event.target.value })
        console.log(event.target.value)
    }

     handleSubmit = () => {
        axios.post('http://localhost:3001/createUser', {name: this.state.name, lastname: this.state.lastname, email: this.state.email, password: this.state.password})
        .then(res => {
            console.log(res, '<---')
        });
         console.log('isabella', this.state.name, this.state.lastname, this.state.email, this.state.password)
    }



    render() {
        return (
            <>
                <p>Create</p>
                <form>
                    <label> Name: <input type="text" name='name' value={this.state.name}  onChange={(e) => {this.getName(e)}} /> </label>
                    <label> Lastname: <input type="text" name='lastname' value={this.state.lastname}  onChange={(e) => {this.getLastname(e)}}/> </label>
                    <label> Email: <input type="text" name='email' value={this.state.email}  onChange={(e) => {this.getEmail(e)}}/> </label>
                    <label> Password: <input type="text" name='password' value={this.state.password}  onChange={(e) => {this.getPassword(e)}}/> </label>
                </form>
                <button onClick={this.handleSubmit}>Submit</button>
            </>
        )
    }
}

export default CreateAccount;
