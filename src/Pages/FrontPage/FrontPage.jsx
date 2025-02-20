import { Link } from "react-router-dom";


const FrontPage = () => {
    return (
        <div className="front-bg flex items-center justify-center">
            <div className="bg-black/25 backdrop-blur-sm rounded-3xl shadow-md text-white text-center flex flex-col gap-10 items-center py-28 px-40">
                <h2 className="text-5xl font-bold">Streamline Your Workflow</h2>
                <p className="text-xl text-gray-300">Organize your work seamlessly with an intuitive and interactive task board.</p>
                <Link to="/login" className="custom-btn block">Join With Us</Link>
            </div>
        </div>
    );
};

export default FrontPage;