import { Link, Navigate, useLocation, useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import toast from "react-hot-toast"
import { TbFidgetSpinner } from 'react-icons/tb'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    const { signIn, signInWithGoogle, loading, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    if (user) return <Navigate to={from} replace={true} />
    if (loading) return <LoadingSpinner />
    // form submit handler

    // original
    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value

        try {
            //User Login
            await signIn(email, password)

            navigate(from, { replace: true })
            toast.success('Login Successful')
        } catch (err) {
            console.log(err)
            toast.error("You need to sign up!")
            // navigate('/signup')
        }
    }


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const email = form.email.value;
    //     const password = form.password.value;

    //     try {
    //         // Attempt to log in
    //         await signIn(email, password);
    //         navigate(from, { replace: true });
    //         toast.success("Login Successful");
    //     } catch (err) {
    //         console.log(err);
    //         if (err?.message.includes("user-not-found")) {
    //             toast.error("User not found! Redirecting to Sign Up...");
    //             setTimeout(() => {
    //                 navigate("/signup");
    //             }, 2000);
    //         } else {
    //             toast.error(err?.message);
    //         }
    //     }
    // };


    // Handle Google Signin
    const handleGoogleSignIn = async () => {
        try {
            //User Registration using google
            await signInWithGoogle()
            navigate(from, { replace: true })
            toast.success('Login Successful')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <button
                    onClick={() => navigate('/')}
                    className="self-start px-4 py-2 mb-4 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded-md "
                    
                >
                    Home
                </button>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='current-password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-[#83e7f4] hover:bg-[#51ddef] text-black w-full rounded-md py-3'
                        >
                            {loading ? (
                                <TbFidgetSpinner className='animate-spin m-auto' />
                            ) : (
                                'Continue'
                            )}
                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button className='text-xs hover:underline hover:text-lime-500 text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div
                    onClick={handleGoogleSignIn}
                    className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                >
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet? Sign up with {' '}
                    {/* <Link
                        to='/signup'
                        className='hover:underline hover:text-lime-500 text-gray-600'
                    >
                        Sign up
                    </Link> */}
                    <br />
                    <Link
                        to='/empsignup'
                        className='hover:underline hover:text-lime-500 text-gray-600'
                    >
                        Employee Sign up
                    </Link>
                    <p>Or</p>
                    <Link
                        to='/hrsignup'
                        className='hover:underline hover:text-lime-500 text-gray-600'
                    >
                        HR Manager Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}


export default Login;