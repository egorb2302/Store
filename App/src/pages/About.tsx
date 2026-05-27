import { Link } from "react-router";
import Arrow from '../assets/move-down.svg';

export default function About() {
    return (
        <div className="flex flex-col items-center gap-4 sm:gap-5 px-4 sm:px-6 lg:px-8">
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold cursor-default 
                        mt-8 sm:mt-12 lg:mt-15 text-center">
                Who&nbsp;
                <span className="text-emerald-300 transition-all 
                                animate-[pulse_3s_ease-in-out_infinite] inline-block 
                                hover:scale-125 lg:hover:scale-200 hover:transition-all duration-750"> 
                    we&nbsp;
                </span> 
                are?
            </h1>
            <div className="pb-4 sm:pb-6 lg:pb-8 border-b-2 sm:border-b-4 border-white">
                <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold text-center px-2">
                    GreenTech — Sustainable Technology for a Better Future.
                </h2>
            </div>        
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-2/3 gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8 lg:mt-10">
                <div className="bg-mauve-200 p-5 sm:p-6 lg:p-8 rounded-2xl w-full">
                    <h2 className="text-black font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 lg:mb-5">
                        About Us
                    </h2>
                    <p className="text-black text-base sm:text-lg lg:text-xl font-semibold">
                        GreenTech is a pioneering technology retailer dedicated to bridging the gap between cutting-edge 
                        innovation and environmental responsibility.<br/> Founded in 2022, we curate and sell 
                        eco-friendly electronics, energy-efficient gadgets, and sustainable tech accessories.<br/> 
                        Our mission is to make green technology accessible, affordable, 
                        and desirable for everyone — from eco-conscious consumers to tech enthusiasts 
                        who want to reduce their carbon footprint without sacrificing performance.
                    </p>
                </div>
                <div className="bg-mauve-200 p-5 sm:p-6 lg:p-8 rounded-2xl w-full">
                    <h2 className="text-black font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 lg:mb-5">
                        Our Philosophy
                    </h2>
                    <p className="text-black text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                        We believe technology should empower people while protecting the planet. 
                        Every product in our catalog is carefully vetted based on three core principles:
                    </p>
                    <ul className="list-disc list-inside text-black text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 space-y-2">
                        <li>
                            <span className="bg-linear-to-r from-emerald-800 to-green-500 bg-clip-text text-transparent font-bold">
                                Sustainability
                            </span> — Products made from recycled, biodegradable, or responsibly sourced materials
                        </li>
                        <li>
                            <span className="bg-linear-to-r from-emerald-800 to-green-500 bg-clip-text text-transparent font-bold">
                                Energy Efficiency
                            </span> — Devices that minimize power consumption without compromising functionality
                        </li>
                        <li>
                            <span className="bg-linear-to-r from-emerald-800 to-green-500 bg-clip-text text-transparent font-bold">
                                Longevity
                            </span> — Repairable, upgradeable, and durable tech designed to last, reducing e-waste
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-mauve-200 p-5 sm:p-6 lg:p-8 rounded-2xl w-full lg:w-2/3 mt-4 sm:mt-5">
                <h1 className="text-black font-bold text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10">
                    Products Categories
                </h1>
                <div className="space-y-5 sm:space-y-6">
                    <div>
                        <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold 
                                    text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 lg:mb-5">
                            Solar-Powered Devices
                        </h2>
                        <p className="text-mauve-500 text-base sm:text-lg lg:text-xl font-semibold">
                            Portable solar chargers, solar-powered Bluetooth speakers, solar backpacks with built-in charging, 
                            and outdoor lighting solutions that harness the power of the sun.
                        </p>
                    </div>
                    <div>
                        <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold 
                                    text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 lg:mb-5">
                            Energy-Efficient Home Tech
                        </h2>
                        <p className="text-mauve-500 text-base sm:text-lg lg:text-xl font-semibold">
                            Smart thermostats, LED smart bulbs, energy-monitoring plugs, and low-power home 
                            assistants that help you reduce electricity bills while staying connected.
                        </p>
                    </div>
                    <div>
                        <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold 
                                    text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 lg:mb-5">
                            Eco-Friendly Accessories
                        </h2>
                        <p className="text-mauve-500 text-base sm:text-lg lg:text-xl font-semibold">
                            Biodegradable phone cases, recycled plastic laptop sleeves, bamboo keyboards, 
                            cork mouse pads, and cables made from reclaimed ocean plastics.
                        </p>
                    </div>
                    <div>
                        <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold 
                                    text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 lg:mb-5">
                            Refurbished & Pre-Loved
                        </h2>
                        <p className="text-mauve-500 text-base sm:text-lg lg:text-xl font-semibold">
                            A carefully inspected selection of refurbished smartphones, laptops, and 
                            tablets that perform like new but cost less and keep electronics out of landfills.
                        </p>
                    </div>
                    <div>
                        <h2 className="bg-linear-to-r from-lime-400 to-emerald-800 bg-clip-text text-transparent font-bold 
                                    text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 lg:mb-5">
                            Green Audio
                        </h2>
                        <p className="text-mauve-500 text-base sm:text-lg lg:text-xl font-semibold">
                            Headphones and earbuds crafted from sustainable wood, recycled aluminum, 
                            and plant-based leather, delivering premium sound with a clear conscience.
                        </p>
                    </div>
                </div>
            </div>
            <p className="text-mauve-200 text-lg sm:text-xl lg:text-2xl font-light my-6 sm:my-8 lg:my-10 text-center">
                Wanna buy our products?
            </p>
            <img className="filter invert sepia hue-rotate-90 -mt-6 sm:-mt-8 lg:-mt-10 w-6 sm:w-8" 
                src={Arrow} alt="arrow down" />
            <Link to="/products">
                <button className="py-2.5 sm:py-3 px-8 sm:px-10 bg-linear-to-r from-emerald-800 to-green-700 
                                text-mauve-200 text-sm sm:text-base font-semibold 
                                rounded-xl sm:rounded-2xl cursor-pointer 
                                transition-all duration-300 
                                hover:brightness-80 active:brightness-60 active:scale-105 
                                mb-20 sm:mb-25 lg:mb-30 shadow-xl">
                    Catalog
                </button>
            </Link>
        </div>
    )
}