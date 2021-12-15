import { sampleGifts, Users } from "./constants";
import { Gift } from "./types";
export default {
  gifts: {
    list: () => {
      const savedItems = localStorage.getItem("adviency");

      return savedItems ? JSON.parse(savedItems) : sampleGifts;
    },
    listById: (id: number) => {
      const savedItems = localStorage.getItem("adviency");

      if (savedItems) {
        return JSON.parse(savedItems).filter((it: Gift) => it.id === id);
      } else {
        return sampleGifts.filter((it: Gift) => it.id === id);
      }
    },
  },
  owners: {
    list: () => {
      Users;
    },
  },
};
