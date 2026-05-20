import Link from "next/link";
import { Trans, useTranslation } from "next-i18next";
import { Flex, Heading, Text, Button, Link as ChakraLink } from "@chakra-ui/react";

export default function Hero() {
  const { t } = useTranslation("common");
  return (
    <Flex
      flexDirection="column"
      bg="layer"
      borderRadius="20px"
      p="17px 24px"
      gap={4}
      dir="auto"
    >
      <Heading fontSize="xl">{t("what-is-habla")}</Heading>
      <Text fontSize="md" fontWeight={400}>
        {t("habla-description")}
      </Text>
      <Text fontSize="md" fontWeight={400}>
        <Trans
          i18nKey="habla-is-open-source"
          components={[
            <ChakraLink
              key="repo"
              href="https://github.com/Giszmo/habla.news"
              isExternal
              textDecoration="underline"
            />,
          ]}
        />
      </Text>
      <Link href={`/faq`} shallow>
        <Button variant="solid" bg="rgba(94, 48, 224, 0.20)" maxWidth="12rem">
          {t("intro")}
        </Button>
      </Link>
    </Flex>
  );
}
