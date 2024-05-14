import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Router from "../routes/Router"

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Router />
            </main>
            <Footer />
        </>
    )
}
