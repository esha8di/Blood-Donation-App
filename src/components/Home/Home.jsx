import React from "react";

const Home = () => {
  return (
    <div className="w-full">

      <section className="bg-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Donate Blood, Save Lives
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 mb-8">
          Join our blood donation community and help people in need. Your one
          step can save many lives.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn bg-black text-white hover:bg-gray-800 px-8">
            Join as a Donor
          </button>
          <button className="btn border border-black text-black hover:bg-black hover:text-white px-8">
            Search Donors
          </button>
        </div>
      </section>

      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Why Donate Blood?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card bg-white shadow-md p-6 text-center border">
            <h3 className="text-xl font-semibold mb-3 text-black">Save Lives</h3>
            <p className="text-gray-700">
              One blood donation can save up to three lives and help patients
              in emergencies.
            </p>
          </div>

          <div className="card bg-white shadow-md p-6 text-center border">
            <h3 className="text-xl font-semibold mb-3 text-black">Community Support</h3>
            <p className="text-gray-700">
              Be a part of a caring community that stands together in times of
              need.
            </p>
          </div>

          <div className="card bg-white shadow-md p-6 text-center border">
            <h3 className="text-xl font-semibold mb-3 text-black">Quick & Safe</h3>
            <p className="text-gray-700">
              Blood donation is a safe and simple process that takes only a few
              minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">
          Contact Us
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <form className="bg-white p-6 rounded-lg shadow-md space-y-4 border">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
              rows="4"
            ></textarea>
            <button className="btn bg-black text-white hover:bg-gray-800 w-full">
              Send Message
            </button>
          </form>

          <div className="flex flex-col justify-center text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-black">Get in Touch</h3>
            <p className="text-gray-700 mb-2">
              Phone: <span className="font-medium">+880 1234 567890</span>
            </p>
            <p className="text-gray-700">
              Email: <span className="font-medium">support@dropblood.com</span>
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">DropBlood</h3>
            <p className="text-sm">
              A platform to connect blood donors with people in need and save
              lives together.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Useful Links</h4>
            <ul className="space-y-2 text-sm">
              <li>Donation Requests</li>
              <li>Become a Donor</li>
              <li>Search Donors</li>
              <li>Dashboard</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm mt-8">
          © 2026 DropBlood. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
