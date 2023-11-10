import { useState, useEffect, Fragment } from "react";
import { FireError } from '../../utils/alertHandler';
import { getCertifications } from "../../client/certifications";
import Card from "./Card/Card";
import NavHistory from "../../components/NavHistory/NavHistory";
import Title from "../../components/Title/Title";
import LoaderPages from "./Loader/LoaderPages";
import styles from "./Certifications.module.css";
import Icons from "../../icons/index";

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
            <Title>
                {Icons.certify()}
                Lista de certificaciones
            </Title>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <div className={styles.certs}>
                    {certifications.map((certs, index) => {
                        return (
                            <Fragment key={index}>
                                <Card
                                    name={certs.name}
                                    description={certs.description}
                                />
                            </Fragment>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
export default Certifications;