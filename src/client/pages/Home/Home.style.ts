import styled from "styled-components";

export const ErrorAlert = styled.div`
  position: fixed;
  width: 300px;
  min-height: 100px;
  background-color: #ff0000;
  opacity: 0.8;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 3px 10px 0 rgba(17, 39, 91, 0.12);
`;

export const ErrorAlertButton = styled.div`
  //background-color: green;
  align-self: end;
`;

export const ErrorAlertText = styled.div`
  color: white;
  overflow: auto;
  word-wrap: break-word;
  max-height: 150px;
`;

export const ErrorAlertSpan = styled.span`
  font-weight: bold;
  color: white;
`;

export const StyledHomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
