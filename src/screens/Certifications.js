import { useState, useEffect } from "react";
import { FireError } from '../utils/alertHandler';
import { getCertifications } from "../client/certifications";
import Card from "../components/CertificationsCard";

function Certifications() {

    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const certs = await getCertifications();
                setCertifications(certs);
            } catch (error) {
                FireError(error.response.message);
            }
        })();
    }, []);

    return (
        <div>
            <h4>Inicio / Certificaciones</h4>
            <div className="certs">
                {certifications.map((certs, index) => {
                    return (
                        <div key={index}>
                            <Card
                                name={certs.name}
                                description={certs.description}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Certifications;