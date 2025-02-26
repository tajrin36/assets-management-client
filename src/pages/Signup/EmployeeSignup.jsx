import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from 'react-icons/tb'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from "react-router";

const EmployeeSignup = () => {
    const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const dob = form.dob.value;

        try {
            const result = await createUser(email, password);
            await updateUserProfile(name, "");
            console.log(result);
            navigate("/employee-dashboard");
            toast.success("Signup Successful");
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
            navigate("/login")
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/empdashboard");
            toast.success("Signup Successful");
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="flex flex-col max-w-md p-6 rounded-md bg-gray-100 text-gray-900">
                <button
                    onClick={() => navigate('/')}
                    className="self-start px-4 py-2 mb-4 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded-md"
                >
                    Home
                </button>
                <h1 className="text-4xl font-bold text-center mb-4">Join as an Employee</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />
                    <input type="email" name="email" placeholder="Email Address" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />
                    <input type="password" name="password" placeholder="Password" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />
                    <input type="date" name="dob" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />

                    <button type="submit" className="bg-[#83e7f4] hover:bg-[#51ddef] text-black w-full rounded-md py-3">
                        {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Sign Up"}
                    </button>
                </form>

                <div className="flex items-center pt-4">
                    <p className="text-sm text-gray-600 text-center w-full">Or sign up with</p>
                </div>

                <div onClick={handleGoogleSignIn} className="flex justify-center items-center p-2 border border-gray-300 rounded cursor-pointer">
                    <FcGoogle size={32} /> <p>Continue with Google</p>
                </div>

                <p className="text-center text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">Login</Link>.
                </p>
            </div>
        </div>
    );
};

export default EmployeeSignup;
