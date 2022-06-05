import React,{useState} from "react";


 const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login: (token)=> {},
    logout: ()=>{}
})


export const AuthContextProvider = (props)=>{
    const [token,setToken] = useState('')
    const userIsLoggedIn = !!token //return false if token is empty string and true if has string
    const loginHadler = (token)=>{
        setToken(token)
    }
    const logoutHadler = ()=>{
        setToken(null)
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