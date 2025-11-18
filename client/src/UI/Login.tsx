
function Login() {
    return(
        <div>
            <div>
            <input
                type="username"
                placeholder="Brugernavn"
                required={true}
            />
            </div>
            <div>
            <input
            type="password"
            placeholder="Password"
            required={true}/>
            </div>
            <div>
                Glemt Password
            </div>
            <div>
            <button type='submit'>
                LOG IND
            </button>
            </div>
        </div>
    )
}

export default Login;