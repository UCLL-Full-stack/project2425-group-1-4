import Header from '../components/header';
import Footer from '@/components/footer';
import CheckoutForm from '@/components/CheckoutForm';
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from '@/i18n';
import './globals.css';

export default function Checkout() {
    return (
        <I18nextProvider i18n={i18n}>
            <div>
                <Header />
                <CheckoutForm />
                <Footer />
            </div>
        </I18nextProvider>
    );
}
