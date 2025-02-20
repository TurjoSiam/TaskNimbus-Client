import { FaGoogle } from "react-icons/fa";
import google from "../../assets/google.json"
import Lottie from "lottie-react";



const Login = () => {
    return (
        <div className="login-bg flex items-center justify-center">
            <div className="bg-black/25 backdrop-blur-sm rounded-3xl shadow-md text-white text-center flex flex-col gap-10 items-center py-16 px-32">
                <div>
                    <Lottie className="max-w-xs" animationData={google}></Lottie>
                </div>
                <button className="custom-btn flex items-center gap-3"><FaGoogle /> Connect With Google</button>
            </div>
        </div>
    );
};

export default Login;