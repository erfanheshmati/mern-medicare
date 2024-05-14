import Header from "../components/Header"
import Footer from "../components/Footer"
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
