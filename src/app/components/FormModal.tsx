import React, { FormEvent, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Select from "react-select";
import { MdAdd } from "react-icons/md";
import { Users } from "../constants";
interface IFormModal {
  handleAddGift: (e: FormEvent<HTMLFormElement>) => boolean;
  giftMessage: string;
  clearGiftInput: VoidFunction;
}

export default function FormModal(props: IFormModal) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef(null);

  function triggerAddGiftModal(e: FormEvent<HTMLFormElement>) {
    if (props.handleAddGift(e)) {
      onClose();
    }
  }

  return (
    <>
      <Button alignSelf="center" onClick={onOpen}>
        Agregar regalo
        <Icon as={MdAdd} />
      </Button>
      <Drawer
        initialFocusRef={firstField}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Agregar regalo</DrawerHeader>

          <DrawerBody overflow="hidden">
            <form onSubmit={triggerAddGiftModal}>
              <Stack color="black">
                <Input
                  ref={firstField}
                  name="giftTitle"
                  placeholder="Regalo..."
                  onChange={props.clearGiftInput}
                />
                <Text color="secondary.300" paddingLeft={4}>
                  {props.giftMessage}
                </Text>
                <Select
                  name="owner"
                  options={Users}
                  placeholder="Destinatario..."
                />
                <Input name="giftQty" placeholder="Cantidad" type="number" />
                <Input name="imgSrc" placeholder="Link a la imagen..." />
                <Button type="submit">Agregar</Button>
              </Stack>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
/*  */
