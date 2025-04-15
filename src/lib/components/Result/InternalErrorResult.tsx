import { ButtonGroup } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { t } from "@/lib/format/message";

import { ContactUsButton } from "./Buttons/ContactUsButton";
import { ErrorIcon } from "./Icons/ErrorIcon";
import { Result } from "./Result";

interface IProps {
  children?: ReactNode;
}

const InternalErrorResult = ({ children }: IProps) => {
  return (
    <Result
      image={<ErrorIcon />}
      heading={t("Something went wrong")}
      subheading={t(
        "It sounds like something unexpected happened right now. Please, give it a try later or, if it's urgent, contact our support team."
      )}
    >
      <ButtonGroup>
        <ContactUsButton />
        {children}
      </ButtonGroup>
    </Result>
  );
};

export { InternalErrorResult };
