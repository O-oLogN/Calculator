const BUTTON_CLICK = 'BUTTON_CLICK';

export const clickButtonAction = (str) => ({
    type: BUTTON_CLICK,
    data: str
})