import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  align-items: flex-start;
  font-weight: 700;
`;

const TabItem = styled.div<{ active: boolean }>`
  cursor: pointer;
  margin-right: 16px;
  align-items: center;
  height: 32px;
  color: ${({ active }) => (active ? `#4573ff` : `#b1b1b1`)};

  ${({ active }) =>
    active &&
    `
    border-bottom: 4px solid #4573ff;
    `}
`;

interface TTabsProps {
  active: number;
  onChange?: (tab: number) => void;
  tabs: string[];
}

export const Tabs = ({ active, onChange, tabs }: TTabsProps) => {
  const handleTabClick = (idx: number) => () => {
    if (typeof onChange === 'function') onChange(idx);
  };
  return (
    <TabContainer>
      {tabs.map((tab, idx) => {
        return (
          <TabItem data-testid={`tab-${tab}`} key={tab} onClick={handleTabClick(idx)} active={active === idx}>
            {' '}
            {tab}{' '}
          </TabItem>
        );
      })}
    </TabContainer>
  );
};
