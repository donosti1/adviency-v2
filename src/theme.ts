import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      body: {
        color: "whiteAlpha.900",
        backgroundColor: "primary.500",
      },
      "*::placeholder": {
        color: "black",
      },
    },
  },
  colors: {
    primary: {
      100: "#009ffd",
      500: "#2a2a72",
    },
    secondary: {
      100: "#aa3a38",
      300: "#e10326",
      500: "#2f7336",
    },
  },
  fonts: {
    body: "Karla",
    heading: "MonteCarlo",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "700",
        height: 12,
      },
      variants: {
        solid: {
          bg: "primary.500",
          color: "white",
          fontSize: "sm",
          px: 6,
          _hover: {
            bg: "secondary.500",
          },
        },
      },
    },
    Drawer: {
      baseStyle: {
        header: {
          color: "black",
        },
        closeButton: {
          bg: "gray.500",
          _hover: { bg: "red.300" },
        },
      },
    },
    Input: {
      parts: ["field"],
      defaultProps: {
        focusBorderColor: "black",
      },
      baseStyle: {
        field: {
          color: "black",
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          /* bg: "whiteAlpha.900", */
        },
        closeButton: {
          bg: "gray.500",
          _hover: { bg: "red.300" },
        },
        header: {
          color: "black",
        },
      },
    },
    Select: {
      baseStyle: {
        color: "black",
        field: {
          focusBorderColor: "black",
        },
      },
    },
    Text: {
      baseStyle: {
        fontWeight: "700",
      },
    },
  },
});
