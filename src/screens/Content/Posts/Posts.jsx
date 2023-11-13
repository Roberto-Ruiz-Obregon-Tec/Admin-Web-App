import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import Icons from "../../../icons/index";

export default function Posts() {
    return (
        <div>
            <NavHistory>
                Gestión de contenido / Publicaciones
            </NavHistory>
            <Title>
                {Icons.posts()}
                Lista de publicaciones
            </Title>
        </div>
    )
}