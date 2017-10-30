import AppDispatcher from "../dispatcher";
import { routerActionTypes } from "../constants";

const routerActions = {
  navigate(component, props) {
    AppDispatcher.handleViewAction({
      type: routerActionTypes.NAVIGATE,
      data: {
        component,
        props
      }
    });
  }
};

export default routerActions;
