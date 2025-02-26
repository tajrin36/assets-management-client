import AboutSection from "../../components/AboutSection";
import Carousel from "../../components/Carousel";
import PackagesSection from "../../components/PackagesSection";

const Home = () => {
    return (
        <div className="container mx-auto pt-26 ">
            <Carousel></Carousel>
            <AboutSection></AboutSection>
            <PackagesSection></PackagesSection>
        </div>
    );
};

export default Home;