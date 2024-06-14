//import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="bg-gray-100 py-20">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to DreamHolidays.com</h1>
                <p className="text-xl mb-8">Your one-stop solution for unforgettable holidays.</p>
                <div className="flex justify-center mt-4">
                    <input 
                        type="text" 
                        placeholder="Search for destinations..." 
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-full text-lg font-bold hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
