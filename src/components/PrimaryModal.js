import React from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    width: "60%",
    maxWidth: "auto",
    overflowY: "auto",
    // padding: "10px",
    overflowX: "hidden",
    maxHeight:"90%",
    backgroundColor:"#f7f7f7"
  },
  overlay: {
    backgroundColor:"rgba(175, 175, 175,0.80)",
    zIndex: 1000
  }
  
};


export default function PrimaryModal({ isOpenProp, children }) {
  return (
    <Modal
      // className="modal fade"
      isOpen={isOpenProp}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}
