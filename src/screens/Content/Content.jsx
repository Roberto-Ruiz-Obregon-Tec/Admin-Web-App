import { useLocation } from "react-router-dom";
import styles from "./Content.module.css";

// Aside
import Aside from "../../components/AsideContent/AsideContent";

// Pages
import ConsultProjects from "./Projects/Projects";
import CreateProjects from "./Projects/CreateProjects/CreateProjects";

// Routes
import {
	PATH_CONTENT_DASHBOARD,
	PATH_CREATE_PROJECTS,
	PATH_PROJECTS
} from "../../config/paths";

export default function ContentDashboard() {
	const location = useLocation();
	const { pathname } = location;

	return (
		<div className={styles.container}>
			<Aside />
			<div className={styles.body}>
				{pathname === PATH_CONTENT_DASHBOARD && <ConsultProjects />}
				{pathname === PATH_PROJECTS && <ConsultProjects />}
				{pathname === PATH_CREATE_PROJECTS && <CreateProjects />}
			</div>
		</div>
	)
}