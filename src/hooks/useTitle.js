import { useEffect } from "react";

const useTitle = title =>{
    useEffect(()=>{
        document.title= `${title} - Buy & Sale`
    },[title])
}

export default useTitle;