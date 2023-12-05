import React from "react";
import { type IOpenMenu } from "@interfaces-types/menu";
import { StyledMenuButton, StyledMenuButtonLine } from "./NavPhone.style";

interface INavPhone {
  opened: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<IOpenMenu>>;
}

const NavPhone: React.FC<INavPhone> = ({ opened, setOpenMenu }) => {
  return (
    <StyledMenuButton
      isPressed={opened}
      onClick={() => {
        if (opened)
          setOpenMenu((prevState) => ({
            ...prevState,
            opened: false,
          }));
        else
          setOpenMenu((prevState) => ({
            ...prevState,
            opened: true,
          }));
      }}
    >
      <StyledMenuButtonLine isPressed={opened} />
      <StyledMenuButtonLine isPressed={opened} />
      <StyledMenuButtonLine isPressed={opened} />
    </StyledMenuButton>
  );
};

export default NavPhone;
