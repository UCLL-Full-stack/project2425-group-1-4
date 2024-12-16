import './globals.css';
import Header from '../components/header';
import ProductOverview from '@/components/ProductsOverview';
import Footer from '@/components/footer';

export default function Products() {
    return (
        <div>
            <Header />
            <ProductOverview />
            <Footer />
        </div>
    );
}
