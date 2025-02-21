import { FaGoogle } from "react-icons/fa";
import google from "../../assets/google.json"
import Lottie from "lottie-react";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";



const Login = () => {

    const navigate = useNavigate();

    const { signInWithGoogle } = useContext(AuthContext);

    const handleGoogleLogin = async () => {
        try {
            const res = await signInWithGoogle()

            const userInfo = {
                name: res?.user?.displayName,
                photo: res?.user?.photoURL,
                email: res?.user?.email
            }

            const response = await axios.post("http://localhost:5000/users", userInfo)
            console.log(response);

            if (response?.data?.insertedId) {
                Swal.fire({
                    title: "Success",
                    text: "You've Logged in Successfully",
                    icon: "success"
                });
                navigate("/dashboard")
            }

        }
        catch (error) {
            console.log("Error:", error.message);
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again",
                icon: "error"
            });
        }
    }



    return (
        <div className="login-bg flex items-center justify-center">
            <div className="bg-black/25 backdrop-blur-sm rounded-3xl shadow-md text-white text-center flex flex-col gap-10 items-center py-16 px-32">
                <div>
                    <Lottie className="max-w-xs" animationData={google}></Lottie>
                </div>
                <button onClick={handleGoogleLogin} className="custom-btn flex items-center gap-3"><FaGoogle /> Connect With Google</button>
            </div>
        </div>
    );

}







export default Login;