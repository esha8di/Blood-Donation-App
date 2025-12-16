import axios from "axios";
import { useContext, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import  { Contextapi } from "../../Authprovider/Authprovider";

  

const Addproduct = () => {
  const [showOnHomepage, setShowOnHomepage] = useState(false);
  const axiosintance=useAxios();

  const {user}= useContext(Contextapi);


  const handlesubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const productName = form.productname.value;
    const description = form.des.value;
    const category = form.category.value;
    const price = parseInt(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const moq = parseInt(form.moq.value);
    const photourl = form.photourl;
    const payment = form.payment.value;

     const file = photourl.files[0];

     const res = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=f382280471f6aa436340fe3333c9fa58`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const selectedurl = res.data.data.display_url;

    
    const formData = {
      productName,
      description,
      category,
      price,
      quantity,
      moq,
      selectedurl,
      payment,
      showOnHomepage,
      managerEmail:user?.email
    };

   axiosintance.post("/products", formData)
      .then((res) => {
        console.log("products", res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(formData);
  };

  return (
    <div className="max-w-3xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

      <form onSubmit={handlesubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name / Title
          </label>
          <input
            name="productname"
            type="text"
            placeholder="Enter product name"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Description
          </label>
          <textarea
            name="des"
            rows="4"
            placeholder="Enter product description"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select category</option>
            <option value="shirt">Shirt</option>
            <option value="pant">Pant</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price (BDT)</label>
          <input
            name="price"
            type="number"
            placeholder="Enter price"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Available Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Available Quantity
          </label>
          <input
            name="quantity"
            type="number"
            placeholder="Enter available quantity"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Minimum Order Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Minimum Order Quantity
          </label>
          <input
            name="moq"
            type="number"
            placeholder="Enter minimum order quantity"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Image
          </label>
          <input
            name="photourl"
            type="file"
            accept="image/*"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Payment Option */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Payment Option
          </label>
          <select name="payment" className="w-full border rounded-lg px-3 py-2">
            <option value="">Select payment option</option>
            <option value="cod">Cash on Delivery</option>
            <option value="prepaid">Payment First</option>
          </select>
        </div>

        {/* Show on Homepage */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnHomepage}
            onChange={() => setShowOnHomepage(!showOnHomepage)}
            className="w-4 h-4"
          />
          <label className="text-sm">Show on Homepage</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
