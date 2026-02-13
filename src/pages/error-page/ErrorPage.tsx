import {
  ErrorPageWrapper,
  ErrorCard,
  Title,
  Description,
  BackButton,
} from "./ErrorPage.styles";

const ErrorPage = () => {
  return (
    <>
      <ErrorPageWrapper>
        <ErrorCard>
          <Title>Error 404</Title>
          <Description>
            The page you are looking for does not exist or has been moved.
          </Description>
          <BackButton to="/">Back to Coffee Menu</BackButton>
        </ErrorCard>
      </ErrorPageWrapper>
    </>
  );
};

export default ErrorPage;
