import { ThreeCircles } from 'react-loader-spinner';
import { RiseLoader } from 'react-spinners';
import Modal from "react-modal";

const CircularLoader = () => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'transparent', // Set background color to none or transparent
            border: 'none', // Remove border if needed
            boxShadow: 'none', // Remove box shadow if needed
        },
        overlay: {
            backgroundColor: "rgba(175, 175, 175,0.80)",
            zIndex: 1000
        }
    };
    return (
        <Modal isOpen style={customStyles}>
            {/* <RingLoader color="#284E93" /> */}
            <RiseLoader color="#284E93" />
        </Modal>
    )

}

export default CircularLoader;