import { useEffect, useState } from "react";

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/user/single/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data?.respons?.userType);
                    setIsAdminLoading(false);
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;