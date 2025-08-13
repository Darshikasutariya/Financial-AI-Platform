import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import useTheme from '@/hooks/useTheme';
import HeroSection from '@/components/heroSection';
import StatsSection from '@/components/StatsSection';
import PricingSection from '@/components/PricingSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import HowItWorksSection from '@/components/HowItWorksSection';


const Home = ({ isDark, toggleTheme }) => {
    return (
        <>

            <Header isDark={isDark} toggleTheme={toggleTheme} />
            <HeroSection isDark={isDark} />
            <StatsSection isDark={isDark} />
            <HowItWorksSection isDark={isDark} />
            <FeaturesGrid isDark={isDark} />
            <PricingSection isDark={isDark} />
            <Footer isDark={isDark} />

        </>
    )
}

export default Home;