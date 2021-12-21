import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { Gift } from "../types";
import { Users } from "../constants";
import "./buyList.css";

export default function BuyListModal({ gifts }: { gifts: Gift[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const print = () => {
    window.print();
  };

  return (
    <Stack>
      <Button onClick={onOpen}>Previsualizar</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comprar:</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="black">
            <Stack maxHeight="xs" overflowY="auto" paddingRight={4} spacing={5}>
              {gifts.map((gift: Gift) => (
                <Stack
                  key={gift.id}
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={[2, 8]}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={[2, 8]}
                    width="100%"
                  >
                    <Avatar name={gift.title} src={gift.imgSrc} />
                    <Stack
                      alignItems={["flex-start", "center"]}
                      direction={["column", "row"]}
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Stack spacing={0}>
                        <Text fontSize={["sm", "md"]}>
                          {gift.title} ({gift.qty})
                        </Text>
                        <Text fontSize={["sm", "md"]}>
                          {Users.filter((us) => {
                            return us.value === gift.ownerId;
                          }).map((us) => us.label)}
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </ModalBody>

          <ModalFooter id="modalFooter">
            <Button colorScheme="blue" flex={1} mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="blue" flex={1} mr={3} onClick={print}>
              Imprimir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
