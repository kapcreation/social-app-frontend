import { SHOW_MODAL, HIDE_MODAL } from "../../constants/actionTypes"

const initialState = { 
  isShow: false, 
  textContent: "", 
  onConfirm: ()=>{} 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { isShow: true, textContent: action.payload.textContent, onConfirm: action.payload.onConfirm }
    case HIDE_MODAL:
      return { ...state, isShow: false }
    default:
      return state
  }
}