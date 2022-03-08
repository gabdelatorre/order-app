import styled from 'styled-components';

const EmptyStateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 21px;
  height: 100%;
`;

const PrimaryMessageWrapper = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
`;

const SecondaryMessageWrapper = styled.div`
  font-weight: 500;
  color: #4a4a4a;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export interface TEmptyStateProps {
  primaryMessage: string;
  secondaryMessage?: string;
}

export const EmptyState = ({ primaryMessage, secondaryMessage }: TEmptyStateProps) => {
  return (
    <EmptyStateWrapper>
      <div>
        <i className='fa-solid fa-square-question' />
      </div>
      <ContentWrapper>
        <PrimaryMessageWrapper>{primaryMessage}</PrimaryMessageWrapper>
        {secondaryMessage ? <SecondaryMessageWrapper>{secondaryMessage}</SecondaryMessageWrapper> : undefined}
      </ContentWrapper>
    </EmptyStateWrapper>
  );
};
