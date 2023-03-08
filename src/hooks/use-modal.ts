import { useState } from "react";

export default function useModal(isOpen: boolean = false) {
	const [state, setState] = useState(isOpen);
	
	const toggleModal = () => setState(prev => !prev);
	
	const openModal = () => setState(true);
	
	const closeModal = () => setState(false);
	
	return {
		state,
		openModal,
		closeModal,
		toggleModal
	};
};
