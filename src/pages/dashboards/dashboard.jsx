import { Box } from "@mui/material";
import { H1, H6, Small, Span } from "components/Typography";

const Dashboard = () => {
  return (
    <Box py={4}>
      <Box textAlign="center" maxWidth={700} margin="auto">
        <Small letterSpacing={2} fontWeight={500} color="primary.main">
          OUR MISSION
        </Small>

        <H1 fontSize={36} fontWeight={800} lineHeight={1.3}>
          We empower teams to organize, manage, and safeguard their documents
          effortlessly
        </H1>
        <H6 color="text.secondary" fontSize={22} py={4} fontWeight={400}>
          We create solutions for{" "}
          <Span fontWeight={600} color="primary.main">
            professionals and organizations
          </Span>{" "}
          to store, access, and share their archives securely and efficiently.
        </H6>
      </Box>
    </Box>
  );
};
export default Dashboard;
