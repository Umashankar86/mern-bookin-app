import Header from "../compenents/Header";
import Footer from "../compenents/footer";
import Hero from "../compenents/hero";

interface Props{
    children: React.ReactNode;
}




const Layout=({children}: Props) =>{

    return(
    <div className="flex flex-col min-h-screen">
        <Header/>
        <Hero/>
        <div className="container mx_auto py-10 px-6 flex-1">{children}</div>
        <Footer/>
        </div>
    );
};

export default Layout;