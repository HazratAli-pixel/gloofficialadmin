import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            console.log("work 1")
            fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/jwt/`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({email})
                
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log("work 2")
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                    setToken(data.accessToken);
                }
            });
        }
    }, [email]);
    return [token];
}

export default useToken;