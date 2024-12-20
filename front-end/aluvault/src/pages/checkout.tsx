import Header from '../components/header';
import Footer from '@/components/footer';
import CheckoutForm from '@/components/CheckoutForm';
import './globals.css';

export default function Checkout() {
    return (
        <div>
            <Header />
            <CheckoutForm />
            <Footer />
        </div>
    );
}
