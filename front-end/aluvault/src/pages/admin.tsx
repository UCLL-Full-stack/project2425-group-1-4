import React, { useState } from 'react';
import './globals.css';
import { products } from '@/dummydata/ProductsData';
import Image from 'next/image';
import { Product, ProductCategory } from '@/types';

const AddProduct: React.FC = () => {
    const [productItems, setProductItems] = useState<Product[]>(products);

    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState<number | null>(null);

    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        stock: 0,
        color: '',
        image: { topImage: '', bottomImages: [] },
        description: '',
        categories: [],
    });

    const [categoryInput, setCategoryInput] = useState<string>('');
    const [bottomImagesInput, setBottomImagesInput] = useState<string>('');

    // Add Product Handler
    const handleAddProduct = () => {
        const parsedCategories: ProductCategory[] = categoryInput
            .split(',')
            .map((name, index) => ({ id: index + 1, name: name.trim() }));

        const parsedBottomImages: string[] = bottomImagesInput.split(',').map((url) => url.trim());

        const newProductEntry: Product = {
            ...newProduct,
            id: isEditing && editProductId !== null ? editProductId : productItems.length + 1,
            categories: parsedCategories,
            image: { ...newProduct.image, bottomImages: parsedBottomImages },
        };

        if (isEditing && editProductId !== null) {
            setProductItems((prev) =>
                prev.map((product) => (product.id === editProductId ? newProductEntry : product))
            );
        } else {
            setProductItems([...productItems, newProductEntry]);
        }

        // Reset form and state
        resetForm();
    };

    const handleEdit = (id: number) => {
        const productToEdit = productItems.find((product) => product.id === id);
        if (productToEdit) {
            setNewProduct({
                name: productToEdit.name,
                price: productToEdit.price,
                stock: productToEdit.stock,
                color: productToEdit.color,
                image: productToEdit.image,
                description: productToEdit.description,
                categories: productToEdit.categories,
            });

            setCategoryInput(productToEdit.categories.map((cat) => cat.name).join(', '));
            setBottomImagesInput(productToEdit.image.bottomImages.join(', '));
            setIsEditing(true);
            setEditProductId(id);
            setShowPopup(true);
        }
    };

    const handleDelete = (id: number) => {
        setProductItems(productItems.filter((product) => product.id !== id));
    };

    const resetForm = () => {
        setNewProduct({
            name: '',
            price: 0,
            stock: 0,
            color: '',
            image: { topImage: '', bottomImages: [] },
            description: '',
            categories: [],
        });
        setCategoryInput('');
        setBottomImagesInput('');
        setIsEditing(false);
        setEditProductId(null);
        setShowPopup(false);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setShowPopup(true)}
            >
                Add Product
            </button>

            {/* Product Table */}
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Image</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Stock</th>
                        <th className="py-2 px-4 border">Color</th>
                        <th className="py-2 px-4 border">Categories</th>
                        <th className="py-2 px-4 border">Description</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productItems.map((product) => (
                        <tr key={product.id} className="text-center">
                            <td className="py-2 px-4 border">
                                <Image
                                    src={product.image.topImage as string}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover mx-auto"
                                    width={64}
                                    height={64}
                                />
                            </td>
                            <td className="py-2 px-4 border">{product.name}</td>
                            <td className="py-2 px-4 border">${product.price.toFixed(2)}</td>
                            <td className="py-2 px-4 border">{product.stock}</td>
                            <td className="py-2 px-4 border">{product.color}</td>
                            <td className="py-2 px-4 border">
                                {product.categories.map((cat) => cat.name).join(', ')}
                            </td>
                            <td className="py-2 px-4 border">{product.description}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleEdit(product.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add/Edit Product Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <div className="flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                className="border px-2 py-1 mb-3"
                                value={newProduct.name}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, name: e.target.value })
                                }
                            />
                            <label>Price</label>
                            <input
                                type="number"
                                className="border px-2 py-1 mb-3"
                                value={newProduct.price}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, price: +e.target.value })
                                }
                            />
                            <label>Stock</label>
                            <input
                                type="number"
                                className="border px-2 py-1 mb-3"
                                value={newProduct.stock}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, stock: +e.target.value })
                                }
                            />
                            <label>Color</label>
                            <input
                                type="text"
                                className="border px-2 py-1 mb-3"
                                value={newProduct.color}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, color: e.target.value })
                                }
                            />
                            <label>Categories (comma-separated)</label>
                            <input
                                type="text"
                                className="border px-2 py-1 mb-3"
                                value={categoryInput}
                                onChange={(e) => setCategoryInput(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={handleAddProduct}
                            >
                                {isEditing ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
