import {useEffect, useState, useRef} from "react"
import {createRoot} from "react-dom/client"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Home, Header, Footer, GrammarPointsList} from "./components"

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Header/>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/grammarPointsList" element={<GrammarPointsList />}/>
                    </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

const appElt = document.getElementById("app");
const root = createRoot(appElt)
root.render(<App />)