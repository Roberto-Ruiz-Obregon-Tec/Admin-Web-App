import { useState, useEffect } from "react";
import { FireError } from '../utils/alertHandler';
import { getCertifications } from "../client/certifications";

function Certifications() {

    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const certs = await getCertifications();

                console.log("certs:", certs);

                setCertifications(certs);
            } catch (error) {
                FireError(error.response.message);
            }
        })();
    }, []);

    return (
        <div>
            {certifications.map((certs, index) => {
                return (
                    <div key={index}>
                        {JSON.stringify(certs)}
                    </div>
                )
            })}
        </div>
    )
}
export default Certifications;