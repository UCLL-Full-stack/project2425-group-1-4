import CheckoutForm from '@/components/CheckoutForm';
import Header from '../components/header';
import Footer from '@/components/footer';
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
