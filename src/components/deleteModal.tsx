"use client";

import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/modal";
import RemoveIcon from "/public/icon/removeIcon.svg";

interface Props {
	deleteFunction: () => void;
}

export default function DeleteModal({ deleteFunction }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<RemoveIcon onClick={onOpen} />
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Deseja excluir?</ModalHeader>
							<ModalBody>
								<p>Após excluir não será possivel recuperar o dado.</p>
							</ModalBody>
							<ModalFooter>
								<button
									type="button"
									className="bg-[#c80303] hover:bg-[#a40303] p-2 max-w-[100px] rounded-md text-white text-sm w-full text-center"
									onClick={onClose}
								>
									Fechar
								</button>
								<button
									type="button"
									className="bg-[#0367c8] hover:bg-[#0353a4] p-2 max-w-[100px] rounded-md text-white text-sm w-full"
									onClick={() => {
										deleteFunction();
										onClose();
									}}
								>
									Excluir
								</button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
