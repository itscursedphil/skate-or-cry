export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

export const setPageTitle = title => {
  return {
    type: SET_PAGE_TITLE,
    payload: {
      title
    }
  };
};

export const dispatchToServer = dispatch => action =>
  dispatch({
    ...action,
    meta: {
      sender: 'client'
    }
  });
