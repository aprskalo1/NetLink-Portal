import {ArrowRightIcon} from '@heroicons/react/24/solid';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import BannerPhoto from '../assets/landing-page-banner.png';

const HeroComponent = () => {
    const [theme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="hero bg-base-200 rounded-2xl w-full max-w-4xl">
                <div className="hero-content flex-col lg:flex-row-reverse w-full p-10">
                    <img
                        src={BannerPhoto}
                        alt="NetLink Portal Banner"
                        className="w-full max-w-sm rounded-lg shadow-2xl lg:w-1/2 ms-3"
                    />
                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                        <p className="text-3xl font-bold text-center lg:text-center">Welcome to NetLink Portal</p>
                        <p className="py-6 text-center lg:text-justify">
                            NetLink is a powerful platform tailored specifically for managing IoT measuring devices. It allows you to easily configure, monitor,
                            and control your measurement devices across various applications. Whether you are tracking environmental data, industrial metrics,
                            or other sensor-based information, NetLink ensures seamless device management, data collection, and integration into your
                            development workflow.
                            <br/><br/>
                            Create your account today and start efficiently managing your IoT measurement devices with precision and ease.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <Link
                                to={"/docs"}
                                className="btn btn-ghost btn-wide flex items-center gap-2 rounded-xl"
                            >
                                Get Started
                                <ArrowRightIcon className="w-5 h-5"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroComponent;
