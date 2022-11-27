import Header from "../organisms/Header";

type StandardTemplateProps = {
  children: React.ReactNode;
};

export default function StandardTemplate(props: StandardTemplateProps) {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
