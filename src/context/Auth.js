import { createContext ,useState ,useContext} from "react";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [username, setUsername] = useState(null);
    const login=username=>{
        setUsername(username)
    }
    
    const logout=()=>{
        setUsername(null)
    }

    return<AuthContext.Provider value={{username ,login,logout}}>{children}</AuthContext.Provider>
}

export const useAuth=()=>{
    return useContext(AuthContext);
}
