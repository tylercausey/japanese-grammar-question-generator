import {createRoot} from "react-dom/client"
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import {Home, Header, Footer, GrammarPointsList} from "./components"

const App = () => {

    return (
        <Router>
            <div>
                <Header/>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/grammarPointsList" element={<GrammarPointsList />}/>
                    </Routes>
                <Footer />
            </div>
        </Router>
    )
}

const appElt = document.getElementById("app");
const root = createRoot(appElt)
root.render(<App />)