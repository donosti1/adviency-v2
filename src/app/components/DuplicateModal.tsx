import React, { FormEvent, useEffect, useRef } from "react";
import {
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Input,
  Stack,
} from "@chakra-ui/react";
import Select from "react-select";

import { FaCopy } from "react-icons/fa";
import api from "../api";
import { Gift } from "../types";
import { Users } from "../constants";
interface IDuplicateModal {
  giftId: number;
  handleDuplicateGift: (e: FormEvent<HTMLFormElement>) => boolean;
}
const customStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (base: any, state: { isFocused: any }) => ({
    ...base,
    borderColor: state.isFocused ? "black" : "none",
    borderWidth: state.isFocused ? 2 : 1,
    // This line disable the blue border
    boxShadow: state.isFocused ? "black" : "none",
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "black" : "none",
    },
  }),
};

export default function DuplicateModal(props: IDuplicateModal) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef(null);

  const gift = api.gifts.listById(props.giftId);

  function handleDuplicateSubmit(e: FormEvent<HTMLFormElement>) {
    if (props.handleDuplicateGift(e)) {
      onClose();
    }
  }

  return (
    <Stack>
      <Button onClick={onOpen}>
        <Icon as={FaCopy} h={[3, 4]} w={[3, 4]} />
      </Button>
      <Modal initialFocusRef={firstField} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Duplicar Regalo</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleDuplicateSubmit}>
            <ModalBody color="black">
              {gift.map((gi: Gift) => (
                <Stack key={gi.id}>
                  <Input name="giftId" type="hidden" value={gi.id} />
                  <Input
                    name="originalOwner"
                    type="hidden"
                    value={gi.ownerId}
                  />
                  <Input
                    ref={firstField}
                    defaultValue={gi.title}
                    name="giftTitle"
                  />
                  <Select
                    defaultValue={Users.filter((u) => u.value === gi.ownerId)}
                    name="owner"
                    options={Users}
                    placeholder="Destinatario..."
                    styles={customStyles}
                  />
                  <Input
                    defaultValue={gi.qty}
                    name="giftQty"
                    placeholder="Cantidad"
                    type="number"
                  />
                  <Input
                    defaultValue={gi.imgSrc}
                    name="imgSrc"
                    placeholder="Link a la imagen..."
                  />
                  <Input
                    defaultValue={gi.unitPrice}
                    name="unitPrice"
                    placeholder="Precio"
                    type="number"
                  />
                </Stack>
              ))}
            </ModalBody>

            <ModalFooter>
              <Stack direction="row" flex={1} justifyContent="space-between">
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Cerrar
                </Button>
                <Button type="submit">Duplicar</Button>
              </Stack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
