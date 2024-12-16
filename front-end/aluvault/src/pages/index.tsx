import Image from 'next/image';
import './globals.css';
import Header from '../components/header';
import ProductPage from '../components/productpage';
import Footer from '@/components/footer';

export default function Home() {
    return (
        <div>
            <Header />
            <ProductPage />
            <Footer />
        </div>
    );
}
