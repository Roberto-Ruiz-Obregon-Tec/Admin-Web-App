export const KEYS_MODAL = {
	PROJECT: "project",
	POST: "post",
	COURSE: "course",
	EVENT: "event",
	CERTIFICATION: "certification",
    SCHOLARSHIP_EDIT: "scholarship_edit",
    PROJECT_EDIT: "project_edit",
    COURSE_EDIT: "course_edit",
    CERTIFICATION_EDIT: "certification_edit",
    ESR_EDIT : "esr_edit",
    EVENT_EDIT : "event_edit",
    DELETE_CERTIFICATION: "delete_certification",
    POST_EDIT: "post_edit",
    COURSE_DELETE: "course_delete",
}

export const EDIT_CERTIFICATION = "edit-certification";
export const DELETE_CERTIFICATION = "delete-certification";
export const CLEAR_MODALS = "clear-modals";
export const OPEN_PROJECT =  "open-project";
export const OPEN_POST =  "open-post";
export const OPEN_COURSE =  "open-course";
export const OPEN_EVENT =  "open-event";
export const OPEN_CERTIFICATION =  "open-certification";
export const EDIT_SCHOLARSHIP = "edit-scholarship"
export const EDIT_PROJECT =  "edit-project";
export const EDIT_COURSE = "edit-course";
export const EDIT_ESR = "edit-esr";
export const EDIT_EVENT = "edit-event";
export const EDIT_POST = "edit-post";

export const DELETE_COURSE = "delete_course";

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
        case EDIT_SCHOLARSHIP: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.SCHOLARSHIP_EDIT,
                documentJSON: action.payload
            }
        }
        case EDIT_PROJECT: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.PROJECT_EDIT,
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
        case EDIT_CERTIFICATION: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.CERTIFICATION_EDIT,
                documentJSON: action.payload
            }
        }
        case EDIT_ESR: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.ESR_EDIT,
                documentJSON: action.payload
            }
        }
        case EDIT_EVENT: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.EVENT_EDIT,
                documentJSON: action.payload
            }
        }
        case EDIT_POST: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.POST_EDIT,
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
        case DELETE_COURSE: {
            if (typeof action.payload !== "object") return state;

            return {
                modalOpened: KEYS_MODAL.COURSE_DELETE,
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