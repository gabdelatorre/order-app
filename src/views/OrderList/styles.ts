import styled from 'styled-components';
import { HeaderBreadcrumb } from '../../components';

export const ViewContainer = styled.div`
  height: 100vh;
  padding: 24px;
  background-color: #efefef;
`;

export const StyledHeaderBreadcrumb = styled(HeaderBreadcrumb)`
  margin-bottom: 24px;
`;

export const CardHeader = styled.div`
  padding: 14px;
  border-bottom: 2px solid #dddddd;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  height: 710px;
  align-items: center;
  justify-content: center;
`;
