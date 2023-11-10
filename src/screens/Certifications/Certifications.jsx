import { useState, useEffect } from "react";
import { FireError } from '../../utils/alertHandler';
import { getCertifications } from "../../client/certifications";
import Card from "./Card/Card";
import NavHistory from "../../components/NavHistory/NavHistory";
import LoaderPages from "./Loader/LoaderPages";
import styles from "./Certifications.module.css";

function Certifications() {

    const [certifications, setCertifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const certs = await getCertifications();
                setIsLoading(false);
                setCertifications(certs);
            } catch (error) {
                FireError(error.response.message);
            }
        })();
    }, []);

    return (
        <div>
            <NavHistory>
                Inicio / Certificaciones
            </NavHistory>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <div className={styles.certs}>
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
            )}
        </div>
    )
}
export default Certifications;