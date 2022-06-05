import React,{useState} from "react";


 const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login: (token)=> {},
    logout: ()=>{}
})


export const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem('userToken')
    const [token,setToken] = useState(initialToken)
    const userIsLoggedIn = !!token //return false if token is empty string and true if has string
    const loginHadler = (token)=>{
        localStorage.setItem('userToken',token)
        setToken(token)
    }
    const logoutHadler = ()=>{
        setToken(null)
        localStorage.removeItem('userToken')
    }

    const contextValue = {
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHadler,
        logout:logoutHadler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;