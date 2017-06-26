export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';

export const setPageTitle = title => {
  return {
    type: SET_PAGE_TITLE,
    payload: {
      title
    }
  };
};
