import { Box, Text } from "../../components";
import { theme } from "../../styles/Theme/theme";

const Cornucopeiac = () => {
  return (
    <Box
      width="100%"
      height="100dvh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0 20vw"
      style={{ mixBlendMode: "difference", color: theme.colors.background }}
    >
      <Text fontSize="3dvw" fontFamily="Instrument Serif" textAlign="center">
        O transbordar do ser, onde tudo é consumido e regenerado.
      </Text>
    </Box>
  );
};

export default Cornucopeiac;
