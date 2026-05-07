
import Form from "../components/Form/Form"

function AuditForm() {
    return (
        <div>
            <h2>
                AI Spend Audit
            </h2>

            <input placeholder="Tool Name" />
            <input placeholder="Plan" />
            <input placeholder="Monthly Spend" />
            <input placeholder="Seats" />
            <input placeholder="Team Size" />
            <input placeholder="Use Case" />

            <Form/>

            <button>Submit</button>
        </div>
    )
}

export default AuditForm
