import styled from 'styled-components';

export const HideWrapper = styled.span<{ showWhen: boolean }>`
    ${({ showWhen }) => (showWhen ? 'display: inline' : 'display:none')}
`;
