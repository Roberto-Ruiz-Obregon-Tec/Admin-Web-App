import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useReducer } from "react";
import { modalReducer, initialState } from "./store/modalReducer";
import Redirect from "../../components/Redirect/Redirect";
import styles from "./Content.module.css";

// Aside
import Aside from "../../components/AsideContent/AsideContent";

// Modals
import ModalProject from "./Modals/Proyects/Proyects";
import ModalPost from "./Modals/Posts/Posts";
import ModalEditProject from "./Modals/EditProyects/EditProyects";

// Pages
import ConsultProjects from "./Projects/Projects";
import CreateProjects from "./Projects/CreateProjects/CreateProjects";

import Certifications from "./Certifications/Certifications";

import Posts from "./Posts/Posts";
import CreatePosts from "./Posts/CreatePosts/CreatePosts";

import Events from "./Events/Events";
import CreateCertifications from "./Certifications/CreateCertifications/CreateCertifications";
import Courses from "./Courses/Courses";
import CreateCourses from "./Courses/CreateCourse/CreateCourses";

// PopUps
import PopUpEditCertification from "./Modals/Certifications/EditCertification";
import PopUpDeleteCertification from "./Modals/Certifications/DeleteCertification";
import ESR from './CompanysESR/CompanysESR';
import Scholarship from './Scholarships/Scholarships';
import CreateScholarship from "./Scholarships/CreateScholarship/CreateScholarship";

// Routes
import {
	PATH_CONTENT_DASHBOARD,
	PATH_CREATE_PROJECTS,
	PATH_PROJECTS,
	PATH_CREATE_CERTIFICATION,
	PATH_CERTIFICATIONS,
	PATH_EVENTS,
	PATH_POSTS,
	PATH_CREATE_POSTS,
	PATH_COURSES,
	PATH_CREATE_COURSE,
	PATH_ESR,
	PATH_SCHOLARSHIP,
	PATH_CREATE_SCHOLARSHIP
} from "../../config/paths";
import { useEffect } from "react";

export const ContentContext = createContext({});

export default function ContentDashboard() {
	const [modalState, modalDispatch] = useReducer(modalReducer, initialState);
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
		keys.add(PATH_CREATE_POSTS);
		keys.add(PATH_CREATE_COURSE);
		keys.add(PATH_CREATE_CERTIFICATION);
		keys.add(PATH_ESR);
		keys.add(PATH_SCHOLARSHIP);
		keys.add(PATH_CREATE_SCHOLARSHIP);

		if (keys.has(pathname)) return;

		navigate(PATH_PROJECTS); // Default
	};

	useEffect(checkIfNeedsToRedirect, [pathname, navigate]);

	return (
		<ContentContext.Provider value={{
			modalState,
			modalDispatch
		}}>

			<ModalProject />
			<ModalPost />
			<PopUpEditCertification />
			<PopUpDeleteCertification />
			<ModalEditProject />
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
					{pathname === PATH_CREATE_POSTS && <CreatePosts />}
					{pathname === PATH_CREATE_COURSE && <CreateCourses />}
					{pathname === PATH_SCHOLARSHIP && <Scholarship />}
					{pathname === PATH_CREATE_SCHOLARSHIP && <CreateScholarship />}
					{pathname === PATH_CREATE_CERTIFICATION && <CreateCertifications />}
					{pathname === PATH_ESR && <ESR />}
					{pathname === PATH_SCHOLARSHIP && <Scholarship />}
				</div>
			</div>
		</ContentContext.Provider>
	)
}