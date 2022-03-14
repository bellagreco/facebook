import React from 'react'
import CreateAccount from '../components/CreateAccount'
import LoginForm from '../components/LoginForm'



class Login extends React.Component {

    componentDidMount() {
        console.log(localStorage)
    }

    render() {
        return (
            <>
            { console.log(localStorage.getItem('token'))}
                <h1>Test 1</h1>
                <CreateAccount />
                <LoginForm />

            </>
        )
    }

}

export default Login