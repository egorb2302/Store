import { Link } from "react-router";
import Arrow from '../assets/move-down.svg';

export default function About() {
    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-white text-9xl font-bold cursor-default my-15">Who&nbsp;
                <span className="text-emerald-300 transition-all 
                animate-[pulse_3s_ease-in-out_infinite] inline-block 
                hover:scale-200 hover:transition-all duration-750"> we </span> are?
            </h1>
            <div className="pb-8 border-b-4 border-white">
                <h2 className="text-white text-2xl font-bold">GreenTech — Sustainable Technology for a Better Future.</h2>
            </div>        
            <div className="grid grid-cols-2 w-2/3 gap-10 mt-10">
                <div className="bg-mauve-200 p-8 rounded-2xl w-full">
                    <h2 className="text-black font-bold text-3xl mb-5">About Us</h2>
                    <p className="text-black text-xl font-semibold">
                        GreenTech is a pioneering technology retailer dedicated to bridging the gap between cutting-edge 
                        innovation and environmental responsibility.<br/> Founded in 2022, we curate and sell 
                        eco-friendly electronics, energy-efficient gadgets, and sustainable tech accessories.<br/> 
                        Our mission is to make green technology accessible, affordable, 
                        and desirable for everyone — from eco-conscious consumers to tech enthusiasts 
                        who want to reduce their carbon footprint without sacrificing performance.
                    </p>
                </div>
                <div className="bg-mauve-200 p-8 rounded-2xl w-full">
                    <h2 className="text-black font-bold text-3xl mb-5">Our Philosophy</h2>
                    <p className="text-black text-xl font-semibold mb-4">
                        We believe technology should empower people while protecting the planet. 
                        Every product in our catalog is carefully vetted based on three core principles:
                    </p>
                    <ul className="list-disc list-inside text-black text-xl font-semibold mb-4">
                        <li>
                            <span className="bg-linear-to-r from-emerald-800 to-green-500 bg-clip-text text-transparent font-bold">Sustainability</span> — Products made from recycled, biodegradable, or responsibly sourced materials
                        </li>
                        <li>
                            <span className="bg-linear-to-r from-emerald-800 to-green-500 bg-clip-text text-transparent font-bold">Energy Efficiency</span> — Devices that minimize power consumption without compromising functionality
                        </li>
                        <li>
                            <span className="bg-linear-to-r from-emerald-800 to-green-500 bg-clip-text text-transparent font-bold">Longevity</span> — Repairable, upgradeable, and durable tech designed to last, reducing e-waste
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-mauve-200 p-8 rounded-2xl w-2/3 mt-5">
                <h1 className="text-black font-bold text-3xl mb-10">Products Categories</h1>
                <div>
                    <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold text-2xl mb-5">Solar-Powered Devices</h2>
                    <p className="text-mauve-500 text-xl font-semibold mb-4">
                        Portable solar chargers, solar-powered Bluetooth speakers, solar backpacks with built-in charging, 
                        and outdoor lighting solutions that harness the power of the sun.
                    </p>
                </div>
                <div>
                    <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold text-2xl mb-5">Energy-Efficient Home Tech</h2>
                    <p className="text-mauve-500 text-xl font-semibold mb-4">
                        Smart thermostats, LED smart bulbs, energy-monitoring plugs, and low-power home 
                        assistants that help you reduce electricity bills while staying connected.
                    </p>
                </div>
                <div>
                    <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold text-2xl mb-5">Eco-Friendly Accessories</h2>
                    <p className="text-mauve-500 text-xl font-semibold mb-4">
                        Biodegradable phone cases, recycled plastic laptop sleeves, bamboo keyboards, 
                        cork mouse pads, and cables made from reclaimed ocean plastics.
                    </p>
                </div>
                <div>
                    <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold text-2xl mb-5">Refurbished & Pre-Loved</h2>
                    <p className="text-mauve-500 text-xl font-semibold mb-4">
                        A carefully inspected selection of refurbished smartphones, laptops, and 
                        tablets that perform like new but cost less and keep electronics out of landfills.
                    </p>
                </div>
                <div>
                    <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold text-2xl mb-5">Green Audio</h2>
                    <p className="text-mauve-500 text-xl font-semibold mb-4">
                        Headphones and earbuds crafted from sustainable wood, recycled aluminum, 
                        and plant-based leather, delivering premium sound with a clear conscience.
                    </p>
                </div>
            </div>
            <p className="text-mauve-200 text-2xl font-light my-10">Wanna buy our products?</p>
            <img className="filter invert sepia hue-rotate-90 -mt-10 w-8" src={Arrow} alt="arrow down" />
            <Link to="/products">
                <button className="py-3 px-10 bg-linear-to-r from-emerald-800 to-green-700 
                text-mauve-200 font-semibold rounded-2xl cursor-pointer 
                transition-all duration-300 hover:brightness-80 active:brightness-60 active:scale-105 mb-30
                shadow-xl">Catalog</button>
            </Link>
        </div>
    )
}