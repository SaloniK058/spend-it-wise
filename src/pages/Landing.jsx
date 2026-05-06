import { useNavigate } from "react-router-dom"

function Landing() {
     const navigate = useNavigate();
    return (
        <div>
            <h1>SpendItWise</h1>
            <h2>Find Hidden AI Spend in Minutes</h2>
            <p>Audit your AI tools and reduce unnecessary expenditures.</p>

            <button onClick={()=> navigate("/audit")}>
                Go to Audit
            </button>
        </div>
    )
}

export default Landing
