import React, { useState, useEffect } from 'react';
import './globals.css';
import Image from 'next/image';
import { Product } from '@/types';
import RentService from '../../service/ProductService';
import { imagesByColor } from '@/dummydata/ProductsData'; // Import imagesByColor mapping

const Admin: React.FC = () => {
    const [productItems, setProductItems] = useState<Product[]>([]);
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

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        color: '',
        categories: [],
    });

    const [categoryInput, setCategoryInput] = useState<string>('');

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsFromDb = await RentService.getProducts();

                const productsWithImages = productsFromDb.map((product: Product, index: number) => {
                    // Manually assign colors based on a round-robin pattern
                    const colorKeys = ['black', 'grey', 'turquoise'];
                    const assignedColor = colorKeys[index % colorKeys.length];

                    return {
                        ...product,
                        color: assignedColor, // Assign the color manually
                        image: imagesByColor[assignedColor],
                    };
                });

                setProductItems(productsWithImages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Add or edit a product
    const handleAddOrEditProduct = async () => {
        try {
            const categories = categoryInput.split(',').map((name, index) => ({
                id: index + 1,
                name: name.trim(),
            }));

            const productData = { ...newProduct, categories };

            if (isEditing && editProductId !== null) {
                await RentService.editProduct(editProductId, productData as Product);
            } else {
                await RentService.createProduct(productData as Product);
            }

            // Refresh products
            const updatedProducts = await RentService.getProducts();
            setProductItems(
                updatedProducts.map((product: Product) => ({
                    ...product,
                    image: imagesByColor[product.color.toLowerCase()] || {
                        topImage: '',
                        bottomImages: [],
                    },
                }))
            );

            resetForm();
        } catch (error) {
            console.error(isEditing ? 'Error editing product' : 'Error adding product:', error);
        }
    };

    // Delete a product
    const handleDelete = async (id: number) => {
        try {
            await RentService.deleteProduct(id);
            setProductItems(productItems.filter((product) => product.id !== id));
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
        }
    };

    // Edit product handler
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
            setIsEditing(true);
            setEditProductId(id);
            setShowPopup(true);
        }
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
                        <tr key={product.id}>
                            <td className="py-2 px-4 border">
                                <Image
                                    src={product.image.topImage}
                                    alt={product.name}
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

            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        {/* Form Fields */}
                        <form>
                            {/* Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>
                            {/* Price */}
                            <div className="mb-4">
                                <label
                                    htmlFor="price"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            price: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter product price"
                                    required
                                />
                            </div>
                            {/* Stock */}
                            <div className="mb-4">
                                <label
                                    htmlFor="stock"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    value={formData.stock}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            stock: parseInt(e.target.value, 10),
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter stock quantity"
                                    required
                                />
                            </div>
                            {/* Color */}
                            <div className="mb-4">
                                <label
                                    htmlFor="color"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Color
                                </label>
                                <select
                                    id="color"
                                    value={formData.color}
                                    onChange={(e) =>
                                        setFormData({ ...formData, color: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                >
                                    <option value="">Select a color</option>
                                    <option value="black">Black</option>
                                    <option value="grey">Grey</option>
                                    <option value="turquoise">Turquoise</option>
                                </select>
                            </div>
                            {/* Description */}
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter product description"
                                    required
                                />
                            </div>
                            {/* Categories */}
                            <div className="mb-4">
                                <label
                                    htmlFor="categories"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Categories (IDs)
                                </label>
                                <input
                                    type="text"
                                    id="categories"
                                    value={formData.categories}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            categories: e.target.value
                                                .split(',')
                                                .map((id) => parseInt(id.trim(), 10)),
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter category IDs separated by commas"
                                    required
                                />
                            </div>
                        </form>
                        {/* Buttons */}
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={handleAddOrEditProduct}
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

export default Admin;
