import styled from "styled-components";

export const PropertyImage = styled.img`
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
    background-image: url(${(props) => props.placeholder});
    background-size: cover;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  &.loaded::before {
    opacity: 0;
  }
`;
