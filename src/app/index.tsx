import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Heading,
  Stack,
  Text,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { BsTrashFill } from "react-icons/bs";

import api from "./api";
import FormModal from "./components/FormModal";
import { Gift } from "./types";
import { Users } from "./constants";
import EditModal from "./components/EditModal";
import DuplicateModal from "./components/DuplicateModal";
import BuyListModal from "./components/BuyList";
import Player from "./components/Player";

function App() {
  const [gifts, setGifts] = useState<Gift[] | null>(null);
  const [giftMessage, setGiftMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [ownerMessage, setOwnerMessage] = useState("");

  function handleDeteleItem(id: number) {
    if (gifts) {
      setGifts(
        gifts.filter((gift: Gift) => {
          return gift.id !== id;
        })
      );
    }
  }
  function handleDeteleAll() {
    setGifts([]);
  }
  function handleAddGift(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (gifts) {
      const giftTitle = e.currentTarget.giftTitle.value;

      if (!giftTitle) {
        setGiftMessage("Ingresa un regalo");

        return false;
      } else if (
        gifts.some(
          (g: Gift) => g.title.toLowerCase() === giftTitle.toLowerCase()
        )
      ) {
        setGiftMessage("Regalo repetido");

        return false;
      }
      const giftQty = e.currentTarget.giftQty.value;
      const giftImgSrc = e.currentTarget.imgSrc.value;
      const owner = e.currentTarget.owner.value;
      const unitPrice = Number(e.currentTarget.unitPrice.value);

      if (!owner) {
        setOwnerMessage("Ingrese un destinatario");

        return false;
      }
      const newGift: Gift = {
        id: Date.now(),
        qty:
          Number(giftQty) < 1
            ? 1
            : Number(giftQty) /* > 6 ? 6 : Number(giftQty) */,
        ownerId: Number(owner),
        title: giftTitle,
        imgSrc: giftImgSrc,
        unitPrice: unitPrice,
      };

      setGifts([...gifts, newGift]);
      e.currentTarget.giftTitle.value = "";
      e.currentTarget.giftQty.value = "";
      e.currentTarget.imgSrc.value = "";

      return true;
    } else {
      return false;
    }
  }
  function handleEditGift(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (gifts) {
      const giftTitle = e.currentTarget.giftTitle.value;
      const giftQty = e.currentTarget.giftQty.value;
      const giftImgSrc = e.currentTarget.imgSrc.value;
      const owner = e.currentTarget.owner.value;
      const originalOwner = e.currentTarget.originalOwner.value;
      const giftId = Number(e.currentTarget.giftId.value);
      const unitPrice = Number(e.currentTarget.unitPrice.value);

      const updatedGift: Gift = {
        id: giftId,
        qty:
          Number(giftQty) < 1
            ? 1
            : Number(giftQty) /* > 6 ? 6 : Number(giftQty) */,
        ownerId: owner != "" ? Number(owner) : Number(originalOwner),
        title: giftTitle,
        imgSrc: giftImgSrc,
        unitPrice: unitPrice,
      };

      setGifts(gifts.map((gi: Gift) => (gi.id === giftId ? updatedGift : gi)));

      return true;
    } else {
      return false;
    }
  }
  function handleDuplicateGift(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (gifts) {
      const giftTitle = e.currentTarget.giftTitle.value;
      const owner = e.currentTarget.owner.value;

      if (!giftTitle) {
        setGiftMessage("Ingresa un regalo");

        return false;
      }
      if (!owner) {
        setOwnerMessage("Ingrese un destinatario");

        return false;
      }
      const giftQty = e.currentTarget.giftQty.value;
      const giftImgSrc = e.currentTarget.imgSrc.value;
      const unitPrice = Number(e.currentTarget.unitPrice.value);

      const newGift: Gift = {
        id: Date.now(),
        qty:
          Number(giftQty) < 1
            ? 1
            : Number(giftQty) /* > 6 ? 6 : Number(giftQty) */,
        ownerId: Number(owner),
        title: giftTitle,
        imgSrc: giftImgSrc,
        unitPrice: unitPrice,
      };

      setGifts([...gifts, newGift]);
      e.currentTarget.giftTitle.value = "";
      e.currentTarget.giftQty.value = "";
      e.currentTarget.imgSrc.value = "";

      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    //debugger;
    //setTimeout(() => {
    api.gifts.list().then((gifts) => setGifts(gifts));
    //}, 1500);
  }, []);

  useEffect(() => {
    if (gifts && gifts.length) {
      const totalPrice = gifts.reduce((acc, currentGift) => {
        return (acc = acc + currentGift.qty * currentGift.unitPrice);
      }, 0);

      setTotalPrice(totalPrice);

      return localStorage.setItem("adviency", JSON.stringify(gifts));
    }
    if (gifts) {
      return localStorage.removeItem("adviency");
    }
  }, [gifts]);
  function clearGiftInput() {
    setGiftMessage("");
  }
  function clearOwnerMessage() {
    setOwnerMessage("");
  }

  return (
    <Stack
      alignItems="center"
      background="primary.500"
      backgroundImage="url('/bg.png') "
      backgroundRepeat="no-repeat"
      bgPos="50% 50%"
      bgSize="100% 100%"
      className="App"
      height="100vh"
      justifyContent="center"
    >
      <Stack
        backdropFilter="blur(12px)"
        background="linear-gradient(22deg, var(--chakra-colors-secondary-300) 0%, var(--chakra-colors-secondary-100) 74%)"
        borderRadius="3xl"
        boxShadow="rgb(38, 57, 77) 0px 20px 30px -10px"
        padding={[4, 8]}
        spacing={[2, 4]}
        width={["90%", "container.sm"]}
      >
        <Heading as="h1" color="whiteAlpha.900" textAlign="center">
          Regalos
        </Heading>
        <Stack>
          {!gifts ? null : (
            <Stack alignSelf="center" direction="row">
              <FormModal
                clearGiftInput={clearGiftInput}
                clearOwnerMessage={clearOwnerMessage}
                giftMessage={giftMessage}
                handleAddGift={handleAddGift}
                ownerMessage={ownerMessage}
              />
              <Player />
            </Stack>
          )}
          {gifts && gifts.length > 0 ? (
            <Stack key={Date.now()} spacing={8}>
              <Stack
                maxHeight="xs"
                overflowY="auto"
                paddingRight={4}
                spacing={5}
              >
                {gifts.map((gift: Gift) => (
                  <Stack
                    key={gift.id}
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={[2, 8]}
                  >
                    <Stack direction="row" spacing={[2, 8]} width="100%">
                      <Avatar name={gift.title} src={gift.imgSrc} />
                      <Stack
                        direction={["column", "row"]}
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Stack
                          alignItems={["flex-start", "flex-start"]}
                          direction={["column", "column"]}
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Stack direction={["row", "row"]} spacing={1}>
                            <Text fontSize={["sm", "md"]}>
                              {gift.title} ({gift.qty})
                            </Text>
                            <Text
                              color="blackAlpha.700"
                              fontSize={["sm", "md"]}
                            >
                              {Users.filter((us) => {
                                return us.value === gift.ownerId;
                              }).map((us) => us.label)}
                            </Text>
                          </Stack>
                          <Stack>
                            <Text
                              fontSize={["sm", "md"]}
                              textAlign={["left", "right"]}
                            >
                              Precio:{" "}
                              {Number(gift.unitPrice * gift.qty).toLocaleString(
                                "es-AR",
                                {
                                  useGrouping: true,
                                  style: "currency",
                                  currency: "ARS",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </Text>
                          </Stack>
                        </Stack>
                        <Stack alignItems="center" direction={["row", "row"]}>
                          <EditModal
                            giftId={gift.id}
                            handleEditGift={handleEditGift}
                          />
                          <DuplicateModal
                            giftId={gift.id}
                            handleDuplicateGift={handleDuplicateGift}
                          />
                          <Button
                            _hover={{ bg: "red.300" }}
                            onClick={() => handleDeteleItem(gift.id)}
                          >
                            <Icon as={BsTrashFill} h={[3, 4]} w={[3, 4]} />
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ) : !gifts ? (
            <Stack alignItems="center" spacing={8}>
              <Text>Cargando...</Text>
              <Spinner
                color="secondary.500"
                emptyColor="gray.200"
                label="Cargando..."
                size="xl"
                speed="0.65s"
                thickness="4px"
              />
            </Stack>
          ) : (
            <Stack>
              <Text>No hay Regalos, agregalos desde el formulario!</Text>
            </Stack>
          )}
        </Stack>
        {gifts && gifts.length > 0 ? (
          <Stack>
            <Text>
              Total:{" "}
              {totalPrice.toLocaleString("es-AR", {
                useGrouping: true,
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Stack>
        ) : null}
        <Stack direction={["column", "row"]} justifyContent="space-around">
          {gifts && gifts.length > 0 ? (
            <>
              <Button onClick={handleDeteleAll}>
                Borrar todos los regalos
              </Button>
              <BuyListModal gifts={gifts} />
            </>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
