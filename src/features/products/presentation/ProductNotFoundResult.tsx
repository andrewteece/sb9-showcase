import { Button, ButtonGroup } from "@chakra-ui/react";

import { ContactUsButton } from "@/lib/components/Result/Buttons/ContactUsButton";
import { WarningIcon } from "@/lib/components/Result/Icons/WarningIcon";
import { Result } from "@/lib/components/Result/Result";
import { useNavigate } from "@/lib/components/Router";
import { useTranslations } from "@/lib/i18n/useTransations";

const ProductNotFoundResult = () => {
  const navigate = useNavigate();
  const t = useTranslations("features.products.not-found");

  return (
    <Result
      image={<WarningIcon />}
      heading={t("heading")}
      subheading={t("description")}
    >
      <ButtonGroup>
        <ContactUsButton />
        <Button onClick={() => navigate("/products")}>
          {t("back-to-list")}
        </Button>
      </ButtonGroup>
    </Result>
  );
};

export { ProductNotFoundResult };
