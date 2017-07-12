export const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP';

export const updateTimestamp = timestamp => {
  return {
    type: UPDATE_TIMESTAMP,
    payload: {
      timestamp
    }
  };
};
