"use client";

import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
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
								<p>Após excluir não será possivel voltar o dado.</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Fechar
								</Button>
								<Button
									color="primary"
									onPress={() => {
										deleteFunction();
										onClose();
									}}
								>
									Excluir
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
