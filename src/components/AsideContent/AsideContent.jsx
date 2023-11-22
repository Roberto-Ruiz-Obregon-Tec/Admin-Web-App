import styles from "./AsideContent.module.css";
import Link from "./Link/Link";
import Icons from "../../icons/index";
import {
	PATH_PROJECTS,
	PATH_CERTIFICATIONS,
	PATH_COURSES,
	PATH_EVENTS,
	PATH_POSTS,
	PATH_ESR,
	PATH_SCHOLARSHIP
} from "../../config/paths";

export default function Aside() {
	return (
		<aside className={styles.container}>
			<div className={styles.title}>
				<span>
					{Icons.menu()}
				</span>
				<span>
					Todos los menús
				</span>
			</div>
			<div className={styles.container_links}>
				<Link text="Acreditaciones" href={PATH_CERTIFICATIONS}>
					{Icons.certify()}
				</Link>
				<Link text="Cursos" href={PATH_COURSES}>
					{Icons.courses()}
				</Link>
				<Link text="Eventos" href={PATH_EVENTS}>
					{Icons.events()}
				</Link>
				<Link text="Publicaciones" href={PATH_POSTS}>
					{Icons.posts()}
				</Link>
				<Link text="Proyectos" href={PATH_PROJECTS}>
					{Icons.projects()}
				</Link>
				<Link text="Certificación ESR" href={PATH_ESR}>
					{Icons.esr()}
				</Link>
				<Link text="Becas" href={PATH_SCHOLARSHIP}>
					{Icons.becas()}
				</Link>
				<Link text="Becas" href={PATH_SCHOLARSHIP}>
					{Icons.becas()}
				</Link>
			</div>
		</aside>
	)
}