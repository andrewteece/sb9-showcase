import { ButtonGroup } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { t } from "@/lib/format/message";

import { RestFiltersButton } from "./Buttons/ResetFiltersButton";
import { WarningIcon } from "./Icons/WarningIcon";
import { Result } from "./Result";

interface IProps {
  children?: ReactNode;
}

const EmptyStateResult = ({ children }: IProps) => {
  return (
    <Result
      image={<WarningIcon />}
      heading={t("No results found")}
      subheading={t("Unfortunately, there is nothing for you here yet!")}
    >
      <ButtonGroup>
        <RestFiltersButton />
        {children}
      </ButtonGroup>
    </Result>
  );
};

export { EmptyStateResult };
