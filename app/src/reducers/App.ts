import { AnyAction } from 'redux';

export enum AppAction {
  TOGGLE_MODAL_STATE = 'TOGGLE_MODAL_STATE',
  ADD_TECHNOLOGY = 'ADD_TECHNOLOGY',
  UPDATE_TECHNOLOGY = 'UPDATE_TECHNOLOGY',
  HYDRATE_STORE = 'HYDRATE_STORE'
}

const initialState: AppState = {
  isModalOpen: false,
  activeRing: {} as Ring,
  technologies: {}
};

function AppReducer(
  state: AppState = initialState,
  action: AnyAction
): AppState {
  switch (action.type) {
    case AppAction.TOGGLE_MODAL_STATE:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        activeRing: action.payload
      };

    case AppAction.ADD_TECHNOLOGY:
      return updateTechnology(state, action.payload);

    case AppAction.UPDATE_TECHNOLOGY:
      return updateTechnology(state, action.payload);

    case AppAction.HYDRATE_STORE:
      return {
        ...state,
        technologies: action.payload
      };

    default:
      return state;
  }
}

function updateTechnology(state: AppState, technology: Technology): AppState {
  return {
    ...state,
    technologies: {
      ...state.technologies,
      [technology.name]: technology
    }
  };
}

export default AppReducer;
