import * as React from "react";
import styled from "styled-components";

interface StyledLabelProps {
  fontSize?: string;
  textColor?: string;
}

export const Label = styled.label<StyledLabelProps>`
  font-size: ${(props) => props.fontSize || "14px"};
  color: ${(props) => (props.textColor !== "yellow" ? "#FFFFFF" : "#FED73B")};
  width: 100%;
  font-weight: 600;
`;
