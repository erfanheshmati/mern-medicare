import About from "../components/About";
import Doctors from "../components/Doctors";
import Faq from "../components/Faq";
import Feature from "../components/Feature";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Services from "../components/Services";
import Testimonial from "../components/Testimonial";

export default function Home() {
    return (
        <>
            <Hero />
            <HowItWorks />
            <About />
            <Services />
            <Feature />
            <Doctors />
            <Faq />
            <Testimonial />
        </>
    )
}
