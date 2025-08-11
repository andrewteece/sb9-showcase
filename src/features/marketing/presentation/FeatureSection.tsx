import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  VStack,
  chakra,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import { useSecondaryTextColor } from "@/lib/theme/useSecondaryTextColor";

interface Feature {
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    title: "Invite team members",
    description:
      "Improve your conversion rates by monitoring exactly what’s going on while your customers are in trial.",
  },
  {
    title: "Unify your payments stack",
    description:
      "Manage all your online and offline sales in one place with a single integration, simplifying reporting and reconciliation.",
  },
  {
    title: "Own your in-store experience",
    description:
      "Provide a seamless customer experience across channels, like reserving online and picking up in store.",
  },
  {
    title: "Grow your platform’s revenue",
    description:
      "Add in-person payments to your platform or marketplace. Using Terminal with Connect.",
  },
  {
    title: "Clear overview for efficient tracking",
    description:
      "Handle your subscriptions and transactions efficiently with the clearer overview in Dashboard.",
  },
  {
    title: "Decide how you integrate Payments",
    description:
      "Love to code? Decide how you integrate Payments and build advanced and reliable products yourself from scratch.",
  },
];

function FeatureSection() {
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const subtext = useSecondaryTextColor();

  return (
    <Box rounded="xl" bg={sectionBg} p={{ base: 6, md: 8 }}>
      <VStack align="start" spacing={3}>
        <Text
          fontWeight="bold"
          letterSpacing="wide"
          textTransform="uppercase"
          color={subtext}
        >
          {"Everything you need"}
        </Text>
        <Heading
          as="h3"
          fontSize={{ base: "3xl", md: "4xl" }}
          lineHeight="shorter"
        >
          {"All-in-one platform"}
        </Heading>
        <Text color={subtext} maxW="2xl" fontSize={{ base: "md", md: "lg" }}>
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magni"
          }
          {"voluptatum cupiditate veritatis in accusamus quisquam."}
        </Text>
      </VStack>

      {/* ✅ Definition list: items are direct children; each item has dt then dd */}
      <chakra.dl
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={{ base: 8, md: 10 }}
        mt={{ base: 6, md: 8 }}
      >
        {FEATURES.map((f) => (
          <FeatureGroup
            key={f.title}
            title={f.title}
            description={f.description}
          />
        ))}
      </chakra.dl>
    </Box>
  );
}

function FeatureGroup({ title, description }: Feature) {
  const iconColor = useColorModeValue("green.500", "green.300");

  return (
    // This <div> is the group wrapper allowed inside <dl>
    <Box as="div">
      {/* dt must be a direct child of the group */}
      <chakra.dt
        display="flex"
        alignItems="center"
        gap={2}
        fontSize="lg"
        fontWeight="bold"
        lineHeight="6"
      >
        <Icon as={CheckIcon} color={iconColor} aria-hidden focusable={false} />
        <chakra.span>{title}</chakra.span>
      </chakra.dt>

      {/* dd follows dt as the next direct child */}
      <chakra.dd mt={2} color="chakra-subtle-text">
        {description}
      </chakra.dd>
    </Box>
  );
}

export default FeatureSection;
export { FeatureSection };
