export const KEYS_MODAL = {
	PROJECT: "project",
	POST: "post",
	COURSE: "course",
	EVENT: "event",
	CERTIFICATION: "certification",
    DELETE_CERTIFICATION: "delete-certification",
    EDIT_CERTIFICATION: "edit-certification",
    PROJECT_EDIT: "project_edit",
    COURSE_EDIT: "course_edit",
    DELETE_CERTIFICATION: "delete-certification",
    EDIT_CERTIFICATION: "edit-certification",
}

export const EDIT_CERTIFICATION = "edit-certification";
export const DELETE_CERTIFICATION = "delete-certification";
export const CLEAR_MODALS = "clear-modals";
export const OPEN_PROJECT =  "open-project";
export const OPEN_POST =  "open-post";
export const OPEN_COURSE =  "open-course";
export const OPEN_EVENT =  "open-event";
export const OPEN_CERTIFICATION =  "open-certification";
export const EDIT_PROJECT =  "edit-project";
export const EDIT_COURSE = "edit-course"

export function modalReducer(state, action){
    switch (action.type) {
        case CLEAR_MODALS: {
            return {
                ...state, // Se deja para que no tintiné
                modalOpened: "",
            };
        }
        case OPEN_PROJECT: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.PROJECT,
                documentJSON: action.payload
            }
        }
        case OPEN_POST: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.POST,
                documentJSON: action.payload
            }
        }
        case OPEN_COURSE: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.COURSE,
                documentJSON: action.payload
            }
        }
        case OPEN_EVENT: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.EVENT,
                documentJSON: action.payload
            }
        }
        case OPEN_CERTIFICATION: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.CERTIFICATION,
                documentJSON: action.payload
            }
        }
<<<<<<< HEAD
        case DELETE_CERTIFICATION: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.DELETE_CERTIFICATION,
                documentJSON: action.payload
            }
        }
        case EDIT_CERTIFICATION: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.EDIT_CERTIFICATION,
=======
        case EDIT_PROJECT: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.PROJECT_EDIT,
>>>>>>> fa8c38f (Feat: Modal view ready)
                documentJSON: action.payload
            }
        }
        case EDIT_COURSE: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.COURSE_EDIT,
                documentJSON: action.payload
            }
        }
        case DELETE_CERTIFICATION: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.DELETE_CERTIFICATION,
                documentJSON: action.payload
            }
        }
        case EDIT_CERTIFICATION: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.EDIT_CERTIFICATION,
                documentJSON: action.payload
            }
        }
        default: {
            console.error("Unknown modal-reducer-type");
            return state;
        }
    }
}

export const initialState = {
    modalOpened: "",
    documentJSON: {}
}