
function Login() {
    return(
        <div>
            <input
                type="username"
                placeholder="Brugernavn"
                required={true}
            />
            <input
            type="password"
            placeholder="Password"
            required={true}/>
            <button type='submit'>
                LOG IND
            </button>
        </div>
    )
}

export default Login;