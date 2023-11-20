import { alertConstants } from '../_constants/alert.constants';

export const alertActions = {
    success: () => ({ type: alertConstants.SUCCESS }),
    error: () => ({ type: alertConstants.ERROR }),
    clear: () => ({ type: alertConstants.CLEAR })
};

