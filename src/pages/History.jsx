import { useEffect, useState } from "react";

function History() {
    const [audits, setAudits] = useState([]);

    useEffect(() => {
        const savedAudits =
            JSON.parse(localStorage.getItem("auditHistory")) || [];

        setAudits(savedAudits);
    }, []);

    return (
        <div className="AuditHistory">
            <h1>Audit History</h1>

            {audits.length === 0 ? (
                <p>No audits found.</p>
            ) : (
                audits.map((audit) => (
                    <div className="card  "
                        key={audit.id}
                        style={{
                            border: "1px solid gray",
                            padding: "16px",
                            marginBottom: "16px",
                            borderRadius: "8px",
                        }}
                    >
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(audit.createdAt).toLocaleString()}
                            </p>
                        <p>
                            <strong>Team Size:</strong>{" "}
                            {audit.formData.teamSize}
                        </p>

                        <p>
                            <strong>Use Case:</strong>{" "}
                            {audit.formData.useCase}
                        </p>

                        <p>
                            <strong>Monthly Savings:</strong> $
                            {audit.auditResults.totalMonthlySavings}
                        </p>

                        <p>
                            <strong>Annual Savings:</strong> $
                            {audit.auditResults.totalAnnualSavings}
                        </p>

                        <p>
                            <strong>Recommendations:</strong>{" "}
                            {
                                audit.auditResults.recommendations[0].reason
                            }
                        </p>

                        {/* <button>
                            View Details
                        </button> */}
                    </div>
                ))
            )}
        </div>
    );
}

export default History;