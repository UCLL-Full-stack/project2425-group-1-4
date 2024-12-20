import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    color: string;
    image: string;
}

const PaymentForm: React.FC = () => {
    const { t, i18n } = useTranslation();
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

    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const calculateTotalPrice = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (isSubmitted) {
            validateField(name, value);
        }
    };

    const validateField = (field: string, value: string) => {
        let error = '';

        switch (field) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = t('form.emailError');
                }
                break;
            case 'shippingAddress':
                if (!value.trim()) {
                    error = t('form.shippingAddressError');
                }
                break;
            case 'cardNumber':
                if (!/^\d{16}$/.test(value)) {
                    error = t('form.cardNumberError');
                }
                break;
            case 'expirationDate':
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
                    error = t('form.expirationDateError');
                }
                break;
            case 'securityCode':
                if (!/^\d{3}$/.test(value)) {
                    error = t('form.securityCodeError');
                }
                break;
            default:
                break;
        }

        setFormErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const validateForm = () => {
        validateField('email', formValues.email);
        validateField('shippingAddress', formValues.shippingAddress);
        validateField('cardNumber', formValues.cardNumber);
        validateField('expirationDate', formValues.expirationDate);
        validateField('securityCode', formValues.securityCode);

        return !Object.values(formErrors).some((error) => error) &&
            Object.values(formValues).every((value) => value.trim())
            ? true
            : false;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (validateForm()) {
            alert(t('form.successMessage'));
        }
    };

    // Function to change language
    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="p-6 w-1/3 shadow-md text-white bg-neutral-950 m-auto">
            <form onSubmit={handleSubmit}>
                {/* Language Switch Button */}
                <div className="mb-4">
                    <button
                        type="button"
                        className="w-full border border-white text-white py-2 rounded hover:bg-white hover:text-black"
                        onClick={() => handleLanguageChange(i18n.language === 'en' ? 'uk' : 'en')}
                    >
                        {i18n.language === 'en' ? 'Switch to Ukrainian' : 'Switch to English'}
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">{t('form.orderSummary')}</h2>
                    {cartItems.length === 0 ? (
                        <p>{t('form.cartEmpty')}</p>
                    ) : (
                        <ul className="mb-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center mb-2">
                                    {/* Product Image */}
                                    {item.image && item.image.src ? (
                                        <img
                                            src={item.image.src}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-md object-cover mr-4"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-300 mr-4"></div> // Placeholder if no image
                                    )}
                                    <span>
                                        {item.name} ({item.color}) x {item.quantity}
                                    </span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="font-bold text-right">
                        {t('form.total')}: ${calculateTotalPrice().toFixed(2)}
                    </div>
                </div>

                <hr className="my-4 border-white" />

                <div className="mb-4">
                    <label className="block text-sm font-bold">{t('form.email')}</label>
                    <input
                        type="email"
                        name="email"
                        placeholder={t('form.emailPlaceholder')}
                        value={formValues.email}
                        onChange={handleChange}
                        className={`w-full border rounded px-3 py-2 bg-black text-white ${
                            formErrors.email ? 'border-red-500' : 'border-white'
                        }`}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold">{t('form.shippingAddress')}</label>
                    <input
                        type="text"
                        name="shippingAddress"
                        placeholder={t('form.shippingAddressPlaceholder')}
                        value={formValues.shippingAddress}
                        onChange={handleChange}
                        className={`w-full border rounded px-3 py-2 bg-black text-white ${
                            formErrors.shippingAddress ? 'border-red-500' : 'border-white'
                        }`}
                    />
                    {formErrors.shippingAddress && (
                        <p className="text-red-500 text-sm">{formErrors.shippingAddress}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm">{t('form.shippingMethod')}</label>
                    <select
                        name="shippingMethod"
                        value={formValues.shippingMethod}
                        onChange={handleChange}
                        className="w-full bg-black border border-white rounded px-3 py-2 text-white"
                    >
                        <option value="Nova Post">{t('form.shippingNovaPost')}</option>
                        <option value="Bpost">{t('form.shippingBpost')}</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm">{t('form.cardNumber')}</label>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder={t('form.cardNumberPlaceholder')}
                        value={formValues.cardNumber}
                        onChange={handleChange}
                        className={`w-full border rounded px-3 py-2 bg-black text-white ${
                            formErrors.cardNumber ? 'border-red-500' : 'border-white'
                        }`}
                    />
                    {formErrors.cardNumber && (
                        <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>
                    )}
                </div>

                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm">{t('form.expirationDate')}</label>
                        <input
                            type="text"
                            name="expirationDate"
                            placeholder={t('form.expirationDatePlaceholder')}
                            value={formValues.expirationDate}
                            onChange={handleChange}
                            className={`w-full border rounded px-3 py-2 bg-black text-white ${
                                formErrors.expirationDate ? 'border-red-500' : 'border-white'
                            }`}
                        />
                        {formErrors.expirationDate && (
                            <p className="text-red-500 text-sm">{formErrors.expirationDate}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm">{t('form.securityCode')}</label>
                        <input
                            type="text"
                            name="securityCode"
                            placeholder={t('form.securityCodePlaceholder')}
                            value={formValues.securityCode}
                            onChange={handleChange}
                            className={`w-full border rounded px-3 py-2 bg-black text-white ${
                                formErrors.securityCode ? 'border-red-500' : 'border-white'
                            }`}
                        />
                        {formErrors.securityCode && (
                            <p className="text-red-500 text-sm">{formErrors.securityCode}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full border border-white text-white py-2 rounded hover:bg-white hover:text-black"
                >
                    {t('form.payNow')}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
