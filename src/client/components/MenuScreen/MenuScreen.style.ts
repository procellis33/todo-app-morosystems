import styled from "styled-components";

export const StyledMenuScreen = styled.div`
  background-color: rgba(186, 194, 197, 0.5);
  width: 420px;
  height: 100%;
  flex: 1;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: fixed;

  @media screen and (max-width: 1400px) {
    width: 220px;
  }

  @media screen and (max-width: 900px) {
    background-color: transparent;
    width: 100%;
    flex: none;
    height: 100%;
    padding-right: 130px;
    padding-left: 20px;
    z-index: 9998;
  }
`;
