import React from 'react';

const PaymentForm: React.FC = () => {
    return (
        <div className="p-6 max-w-md ml-32 mt-4 border border-white shadow-md text-white">
            {/* Email */}
            <div className="mb-4">
                <label className="block text-sm font-bold">Email</label>
                <p className="font-bold">John.Smith@email.example.com</p>
            </div>

            <hr className="my-4 border-white" />

            {/* Shipping Address */}
            <div className="mb-4">
                <label className="block text-sm font-medium">Shipping Address</label>
                <input
                    type="text"
                    placeholder="Hlushkova Ave 13В"
                    className="w-full border border-white rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
            </div>

            {/* Shipping Method */}
            <div className="mb-4">
                <label className="block text-sm">Shipping method</label>
                <select className="w-full bg-black border border-white rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white mt-1">
                    <option value="Nova Post">Nova Post</option>
                    <option value="Bpost">Bpost</option>
                </select>
            </div>

            <hr className="my-4 border-white" />

            {/* Payment */}
            <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">Payment</h2>
                <p className="text-sm mb-4">All transactions are secure and encrypted</p>

                {/* Card Number */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Card number</label>
                    <input
                        type="text"
                        placeholder="Card number"
                        className="w-full border border-white rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white"
                    />
                </div>
                {/* Expiration Date & Security Code */}
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Expiration date (MM/YY)</label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full border border-white rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Security code</label>
                        <input
                            type="text"
                            placeholder="CVC"
                            className="w-full border border-white rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white"
                        />
                    </div>
                </div>

                {/* Name on Card */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Name on card</label>
                    <p className="font-bold">John Smith</p>
                </div>
            </div>

            {/* Pay Now Button */}
            <button className="w-full border border-white text-white py-2 rounded hover:bg-white hover:text-black">
                Pay now
            </button>
        </div>
    );
};

export default PaymentForm;
