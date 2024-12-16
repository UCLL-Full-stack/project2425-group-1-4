import { headers } from 'next/headers';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <a href="/">
                <h1 className="mt-4 text-3xl font-bold border-y-2 py-4 px-12">AluVault</h1>
            </a>
        </div>
    );
};

export default Header;
