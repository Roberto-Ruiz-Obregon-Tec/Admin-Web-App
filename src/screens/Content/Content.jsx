import { useLocation, useNavigate } from "react-router-dom";
import Redirect from "../../components/Redirect/Redirect";
import styles from "./Content.module.css";

// Aside
import Aside from "../../components/AsideContent/AsideContent";

// Pages
import ConsultProjects from "./Projects/Projects";
import CreateProjects from "./Projects/CreateProjects/CreateProjects";

import Certifications from "./Certifications/Certifications";
import Posts from "./Posts/Posts";
import Events from "./Events/Events";
import Courses from "./Courses/Courses";

// Routes
import {
	PATH_CONTENT_DASHBOARD,
	PATH_CREATE_PROJECTS,
	PATH_PROJECTS,

	PATH_CERTIFICATIONS,
	PATH_COURSES,
	PATH_EVENTS,
	PATH_POSTS
} from "../../config/paths";
import { useEffect } from "react";

export default function ContentDashboard() {
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname } = location;

	const checkIfNeedsToRedirect = () => {
		const keys = new Set();
		keys.add(PATH_CONTENT_DASHBOARD);
		keys.add(PATH_CREATE_PROJECTS);
		keys.add(PATH_PROJECTS);
		keys.add(PATH_CERTIFICATIONS);
		keys.add(PATH_COURSES);
		keys.add(PATH_EVENTS);
		keys.add(PATH_POSTS);

		if (keys.has(pathname)) return;

		navigate(PATH_PROJECTS); // Default
	};

	useEffect(checkIfNeedsToRedirect, [pathname]);

	return (
		<div className={styles.container}>
			<Aside />
			<div className={styles.body}>
				{/* Default */}
				{pathname === PATH_CONTENT_DASHBOARD && <Redirect to={PATH_PROJECTS} />}

				{pathname === PATH_PROJECTS && <ConsultProjects />}
				{pathname === PATH_CREATE_PROJECTS && <CreateProjects />}
				{pathname === PATH_CERTIFICATIONS && <Certifications />}
				{pathname === PATH_COURSES && <Courses />}
				{pathname === PATH_EVENTS && <Events />}
				{pathname === PATH_POSTS && <Posts />}
			</div>
		</div>
	)
}