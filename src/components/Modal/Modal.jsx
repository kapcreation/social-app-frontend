import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideModal } from '../../redux/actions/modal'
import CloseIcon from '@mui/icons-material/Close'

import "./Modal.scss"

const Modal = () => {
  const dispatch = useDispatch()

  const { isShow, textContent, onConfirm } = useSelector((state) => state.modal)

  const confirm = (e) => {
    e.stopPropagation()

    onConfirm && onConfirm()
    hide()
  }

  const hide = (e) => {
    e.stopPropagation()

    dispatch(hideModal())
  }

  return (
    <div className='modal' style={{visibility: isShow ? "visible" : "hidden"}}>
      <div className='overlay' onClick={hide}></div>
      <div className='panel'>
        <p>{textContent}</p>

        <div className='btns'>
          {
            onConfirm 
            ? 
            <><button onClick={hide}>Cancel</button>
            <button onClick={confirm}>Confirm</button></> 
            :
            <button onClick={hide}>Ok</button>
          }
        </div>
        <CloseIcon onClick={hide} className='close' />
      </div>
    </div>
  )
}

export default Modal