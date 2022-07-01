import styled from 'styled-components';

export const HideWrapper = styled.span<{ showWhen: boolean | undefined }>`
    ${({ showWhen }) => (showWhen ? 'display: inline' : 'display:none')}
`;
