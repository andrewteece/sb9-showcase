import { Button, type ButtonProps } from "@chakra-ui/react";

import { useNotImplementedYetToast } from "@/lib/components/Toast/useNotImplementedYetToast";
import { t } from "@/lib/format/message";

interface IProps extends ButtonProps {}

const RestFiltersButton = (props: IProps) => {
  const notImplemented = useNotImplementedYetToast();

  return (
    <Button onClick={notImplemented} {...props}>
      {t("Reset filters")}
    </Button>
  );
};

export { RestFiltersButton };
