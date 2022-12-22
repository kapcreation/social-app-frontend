import { SHOW_MODAL, HIDE_MODAL } from "../../constants/actionTypes";

export const showModal = (textContent, onConfirm) => (dispatch) => {
  dispatch({ type: SHOW_MODAL, payload: { textContent, onConfirm } })
}

export const hideModal = () => (dispatch) => {
  dispatch({ type: HIDE_MODAL })
}