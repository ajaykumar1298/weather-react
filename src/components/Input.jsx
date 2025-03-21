import React from "react";

function Input({ props }) {
    console.log(props.city);
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            {/* Input Field */}
            <div className="relative text-white">
                <input
                    type="text"
                    value={props.city}
                    onChange={(e) => props.setCity(e.target.value)}
                    placeholder="Enter City Name"
                    title="City name"
                    className="w-72 p-3 text-lg border border-gray-300 rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
    );
}

export default Input;
