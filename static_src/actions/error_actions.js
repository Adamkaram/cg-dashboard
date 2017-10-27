/*
 * Actions for global errors across the whole application.
 */

import AppDispatcher from '../dispatcher';
import { errorActionTypes } from '../constants';

/* eslint-disable no-alert, no-console */
export default {
  errorDelete(err) {
    console.error('delete failure', err);
    // throw err;
  },

  errorFetch(err) {
    console.error('fetch failure', err);
    // throw err;
  },

  errorPost(err) {
    console.error('post failure', err);
    // throw err;
  },

  errorPut(err) {
    console.error('put failure', err);
    // throw err;
  },

  dismissError(err) {
    AppDispatcher.handleUIAction({
      type: errorActionTypes.DISMISS,
      err
    });

    return Promise.resolve(err);
  },

  noticeError(err) {
    AppDispatcher.handleUIAction({
      type: errorActionTypes.NOTIFY,
      err
    });

    return Promise.resolve(err);
  },

  importantDataFetchError(err, entityMessage) {
    const msg =
      'There was an issue connecting to the dashboard, ' +
      `${entityMessage || 'please try again later.'}`;

    AppDispatcher.handleServerAction({
      type: errorActionTypes.IMPORTANT_FETCH,
      msg,
      err
    });

    return Promise.resolve(err);
  },

  clearErrors() {
    AppDispatcher.handleUIAction({
      type: errorActionTypes.CLEAR
    });

    return Promise.resolve();
  }
};
/* eslint-enable no-alert, no-console */
