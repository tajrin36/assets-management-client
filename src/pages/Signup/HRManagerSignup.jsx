import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from 'react-icons/tb'
import { FcGoogle } from 'react-icons/fc'
import { imageUpload } from "../../api/utils";
import { Link, useNavigate } from "react-router";

const HRManagerSignup = () => {
    const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const companyName = form.companyName.value;
        const email = form.email.value;
        const password = form.password.value;
        const dob = form.dob.value;
        const packageType = form.package.value;
        const companyLogo = form.logo.files[0];

        const logoURL = await imageUpload(companyLogo);

        try {
            const result = await createUser(email, password);
            await updateUserProfile(name, logoURL);
            console.log(result);

            // Redirect to payment page
            
            toast.success("Signup Successful! Redirecting to payment...");
            navigate("/hrdashboard");
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/hrdashboard");
            toast.success("Signup Successful! Redirecting to payment...");
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
                <h1 className="text-4xl font-bold text-center mb-4">Join as an HR Manager</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />
                    <input type="text" name="companyName" placeholder="Company Name" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />

                    <label className="text-sm">Company Logo</label>
                    <input type="file" name="logo" accept="image/*" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />

                    <input type="email" name="email" placeholder="Email Address" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />
                    <input type="password" name="password" placeholder="Password" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />
                    <input type="date" name="dob" required className="w-full px-3 py-2 border rounded-md bg-gray-200" />

                    <label className="text-sm">Select a Package</label>
                    <select name="package" required className="w-full px-3 py-2 border rounded-md bg-gray-200">
                        <option value="basic">Basic - $50/month</option>
                        <option value="standard">Standard - $100/month</option>
                        <option value="premium">Premium - $200/month</option>
                    </select>

                    <button type="submit" className="bg-[#83e7f4] hover:bg-[#51ddef] text-black w-full rounded-md py-3">
                        {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Proceed to Payment"}
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

export default HRManagerSignup;
