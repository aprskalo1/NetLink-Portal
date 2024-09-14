import BannerPhoto from '../assets/landing-page-banner.png';
import {ArrowRightIcon} from '@heroicons/react/24/solid';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';

const HeroComponent = () => {
    const [theme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-5">
            <div className="hero bg-base-200 rounded-2xl w-full max-w-4xl">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <img
                        src={BannerPhoto}
                        alt="NetLink Portal Banner"
                        className="w-full max-w-sm rounded-lg shadow-2xl lg:w-1/2"
                    />
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-4xl font-bold text-center lg:text-left">Welcome to NetLink Portal</h1>
                        <p className="py-6 text-center lg:text-left">
                            NetLink is a platform that helps you to manage your IoT measurement
                            devices and configurations in application development. Create your account and
                            start managing your IoT devices today.
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
