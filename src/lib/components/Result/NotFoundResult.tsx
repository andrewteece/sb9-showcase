import { ButtonGroup } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { t } from "@/lib/format/message";

import { ContactUsButton } from "./Buttons/ContactUsButton";
import { WarningIcon } from "./Icons/WarningIcon";
import { Result } from "./Result";

interface IProps {
  children?: ReactNode;
}

const NotFoundResult = ({ children }: IProps) => {
  return (
    <Result
      image={<WarningIcon />}
      heading={t("Page doesn't exist")}
      subheading={t(
        "Probably you got here by accident. If you think there is something wrong on our side, please contact us!"
      )}
    >
      <ButtonGroup>
        <ContactUsButton />
        {children}
      </ButtonGroup>
    </Result>
  );
};

export { NotFoundResult };
