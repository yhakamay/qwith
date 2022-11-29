import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

type SomethingWentWrongProps = {
  children?: React.ReactNode;
};

export function SomethingWentWrong(props: SomethingWentWrongProps) {
  const { children } = props;

  return (
    <Alert status="error" minH="8rem">
      <AlertIcon />
      <AlertTitle>🤯</AlertTitle>
      <AlertDescription>
        {children ? children : "Something went wrong."}
      </AlertDescription>
    </Alert>
  );
}
