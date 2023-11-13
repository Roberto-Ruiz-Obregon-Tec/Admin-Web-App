import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import Icons from "../../../icons/index";

export default function Events() {
    return (
        <div>
            <NavHistory>
                Gestión de contenido / Cursos
            </NavHistory>
            <Title>
                {Icons.courses()}
                Lista de cursos
            </Title>
        </div>
    )
}