import './globals.css';
import Header from '../components/header';
import ProductOverview from '@/components/ProductsOverview';
import Footer from '@/components/footer';
import { products } from '@/dummydata/ProductsData';
export default function Products() {
    return (
        <div>
            <Header />
            <ProductOverview products={products} />
            <Footer />
        </div>
    );
}
