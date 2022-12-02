import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import loginsvg from '../../assets/icons/Mobile login-amico.svg';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import Loading from '../Shared/Loading/Loading';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, signinWithGoogle,setUser } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('')
    const location = useLocation();
    const [loadingss, setLoading] = useState(false);
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    useTitle("Login Form")
    

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result?.user;
                const email = user?.email
                    // fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/jwt/`,{
                    //     method: 'POST',
                    //     headers: {
                    //         'content-type': 'application/json'
                    //     },
                    //     body: JSON.stringify({email})
                    // })
                    // .then(res => res.json())
                    // .then(data => {
                    //     if (data.accessToken) {
                    //         localStorage.setItem('accessToken', data.accessToken);
                    //         toast('User login Successful.')
                    //         setLoading(false)
                    //         setToken(data.accessToken)
                    //         navigate(from, { replace: true });
                    //     }
                    // });
                navigate(from, { replace: true });
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }
    const signinwithgoogle = ()=>{
        signinWithGoogle()
        .then(result=>{
            const user= result.user;
            setError('');
            toast.success("Successfuly Loged in")
            const name = user.displayName
            const email = user.email
            const photoUrl = user.photoURL
            const userType = "Buyer"
            const address = ""
            saveUser(name, email, userType, address, photoUrl)
        })
        .then(error => setError(error.message))
    }



    //for database information store
    const saveUser = (name, email, userType, address, photoUrl) =>{
        const user ={name, email,userType,address,photoUrl};
        fetch('', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            fetch(``,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({email})
                
            })
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                    toast.success('Social login Successful.')
                    setLoading(false)
                    setToken(data.accessToken)
                    navigate(from, { replace: true });
                }
            });
        })
    }




    return (
        <div className='py-24 flex justify-center items-center'>
         {
                loadingss? <Loading></Loading>: ""
            }
            <div>
                <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row items-center justify-center gap-0 sm:gap-10'>
                    <div className='w-full sm:w-1/2'>
                        <div className="text-center lg:text-left">
                            <img className='w-full' src={loginsvg} alt="loginsvg" />
                        </div>
                    </div>
                    <div className='w-full sm:w-1/2 p-7 shadow-lg rounded-lg'>
                        <h2 className='text-3xl font-bold text-center'>Login</h2>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text font-bold">Email</span></label>
                                <input type="text"
                                    {...register("email", {
                                        required: "Email Address is required"
                                    })}
                                    className="input input-bordered w-full " />
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label"> <span className="label-text font-bold">Password</span></label>
                                <input type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                    })}
                                    className="input input-bordered w-full" />
                                <label className="label"> <span className="label-text">Forget Password?</span></label>
                                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                            </div>
                            <input className='btn btn-accent w-full' value="Login" type="submit" />
                            <div>
                                {loginError && <p className='text-red-600'>{loginError}</p>}
                            </div>
                        </form>
                        {/* <p className='p-3'>Don't have an account? <Link className='text-secondary' to="/signup">create new</Link></p>
                        <div className="divider">OR</div>
                        <button className='btn btn-outline w-full' onClick={signinwithgoogle}>CONTINUE WITH GOOGLE</button> */}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;