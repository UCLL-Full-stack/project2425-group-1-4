import React, { useEffect, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    color: string;
    image: string;
}

const PaymentForm: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [formValues, setFormValues] = useState({
        email: '',
        shippingAddress: '',
        shippingMethod: 'Nova Post',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        shippingAddress: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Load cart items from localStorage when the component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Calculate the total price
    const calculateTotalPrice = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (isSubmitted) {
            validateField(name, value);
        }
    };

    // Validate individual fields
    const validateField = (field: string, value: string) => {
        let error = '';

        switch (field) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Email is required and must be a valid email address.';
                }
                break;
            case 'shippingAddress':
                if (!value.trim()) {
                    error = 'Shipping address is required.';
                }
                break;
            case 'cardNumber':
                if (!/^\d{16}$/.test(value)) {
                    error = 'Card number must be 16 digits.';
                }
                break;
            case 'expirationDate':
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
                    error = 'Expiration date must be in MM/YY format.';
                }
                break;
            case 'securityCode':
                if (!/^\d{3}$/.test(value)) {
                    error = 'Security code must be 3 digits.';
                }
                break;
            default:
                break;
        }

        setFormErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    // Validate the entire form
    const validateForm = () => {
        const errors = {
            email: '',
            shippingAddress: '',
            cardNumber: '',
            expirationDate: '',
            securityCode: '',
        };

        validateField('email', formValues.email);
        validateField('shippingAddress', formValues.shippingAddress);
        validateField('cardNumber', formValues.cardNumber);
        validateField('expirationDate', formValues.expirationDate);
        validateField('securityCode', formValues.securityCode);

        // Check if any errors exist
        return !Object.values(formErrors).some((error) => error) &&
            Object.values(formValues).every((value) => value.trim())
            ? true
            : false;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (validateForm()) {
            console.log('Form submitted successfully:', formValues);
            alert('Payment successful!');
        } else {
            console.log('Form has errors:', formErrors);
        }
    };

    return (
        <div className="p-6 w-1/3 shadow-md text-white bg-neutral-950 m-auto">
            <form onSubmit={handleSubmit}>
                {/* Cart Items */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="mb-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center mb-2">
                                    <span>
                                        {item.name} ({item.color}) x {item.quantity}
                                    </span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="font-bold text-right">
                        Total: ${calculateTotalPrice().toFixed(2)}
                    </div>
                </div>

                <hr className="my-4 border-white" />
                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-bold">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        value={formValues.email}
                        onChange={handleChange}
                        className={`w-full border rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white ${
                            formErrors.email ? 'border-red-500' : 'border-white'
                        }`}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>

                <hr className="my-4 border-white" />

                {/* Shipping Address */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Shipping Address</label>
                    <input
                        type="text"
                        name="shippingAddress"
                        placeholder="Hlushkova Ave 13В"
                        value={formValues.shippingAddress}
                        onChange={handleChange}
                        className={`w-full border rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white ${
                            formErrors.shippingAddress ? 'border-red-500' : 'border-white'
                        }`}
                    />
                    {formErrors.shippingAddress && (
                        <p className="text-red-500 text-sm">{formErrors.shippingAddress}</p>
                    )}
                </div>

                {/* Shipping Method */}
                <div className="mb-4">
                    <label className="block text-sm">Shipping method</label>
                    <select
                        name="shippingMethod"
                        value={formValues.shippingMethod}
                        onChange={handleChange}
                        className="w-full bg-black border border-white rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white mt-1"
                    >
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
                            name="cardNumber"
                            placeholder="Card number"
                            value={formValues.cardNumber}
                            onChange={handleChange}
                            className={`w-full border rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white ${
                                formErrors.cardNumber ? 'border-red-500' : 'border-white'
                            }`}
                        />
                        {formErrors.cardNumber && (
                            <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>
                        )}
                    </div>

                    {/* Expiration Date & Security Code */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium">
                                Expiration date (MM/YY)
                            </label>
                            <input
                                type="text"
                                name="expirationDate"
                                placeholder="MM/YY"
                                value={formValues.expirationDate}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white ${
                                    formErrors.expirationDate ? 'border-red-500' : 'border-white'
                                }`}
                            />
                            {formErrors.expirationDate && (
                                <p className="text-red-500 text-sm">{formErrors.expirationDate}</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium">Security code</label>
                            <input
                                type="text"
                                name="securityCode"
                                placeholder="CVC"
                                value={formValues.securityCode}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white ${
                                    formErrors.securityCode ? 'border-red-500' : 'border-white'
                                }`}
                            />
                            {formErrors.securityCode && (
                                <p className="text-red-500 text-sm">{formErrors.securityCode}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pay Now Button */}
                <button
                    type="submit"
                    className="w-full border border-white text-white py-2 rounded hover:bg-white hover:text-black"
                >
                    Pay now
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
