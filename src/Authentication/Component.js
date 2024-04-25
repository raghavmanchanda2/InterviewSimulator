import styled from 'styled-components';

const fontFamily = "'Montserrat', sans-serif";

export const Container = styled.div`
  background-color: #fff;
  font-family: ${fontFamily};
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 80%;
  max-width: 100%;
  min-height: 80%;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const Title = styled.h1`
    font-weight: bold;
    font-family: ${fontFamily};
  margin-bottom: 30px;
`;
export const Title2 = styled.h1`
    font-weight: bold;
    font-family: ${fontFamily};
  margin-bottom: 30px;
  margin-top: -30px;
`;
export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.signinIn !== true ? `
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
    ` : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 50px;
  height: 100%;
  text-align: center;
`;

export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 100%;
`;

export const Label = styled.label`
  position: absolute;
  font-weight: bold;
  top: -20px;
  left: 0;
  font-size: 14px;
  color: #1e1e1e;
`;

export const Input = styled.input.attrs({
  autoComplete: 'off'
})`
  background-color: #eee;
  border: none;
  outline: none; /* Remove the default focus border */
  font-family: 'Montserrat', sans-serif; /* Set font family to Montserrat */

  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 10px;
  border: 1px solid #685AED;
  background-color: #685AED;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in, box-shadow 0.3s ease-in-out; /* Add box-shadow transition */
  cursor: pointer; /* Set cursor to pointer */
  position: relative; /* Required for pseudo-element */
  overflow: hidden; /* Hide overflowing shadow */
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }

  /* Background drop shadow effect */
  box-shadow: 0px 10px 20px rgba(104, 90, 237, 0.3); /* Adjust shadow color and opacity */
`;

export const Image = styled.img`
  width: 60%; /* Adjust width as needed */
  object-fit: fill;
  height: auto; /* Maintain aspect ratio */
  margin-bottom: 20px; /* Add some spacing between the image and paragraph */
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
  cursor: pointer; /* Set cursor to pointer */
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  right: 0;
  text-decoration: none;
  margin-top: -30px;
  margin-bottom: 10px;
  
`;
export const RadioInput = styled.input`
  margin-right: 8px;
`;

export const RadioLabel = styled.span`
  color: #333;
`;

export const RadioContainer = styled.label`
  display: flex;
  align-items: start;
  justify-content: start;
  margin-bottom: 30px;
  margin-top: 5px;
  font-size: 14px;
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props => props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #685AED, #685AED);
  background: linear-gradient(to right, #685AED, #685AED);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  justify-content: center;
  align-items: center;
  margin-left: -40px;
  display: flex;
  flex-direction: column;
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: -40px;
  transform: translateX(0);
  justify-content: center;
  margin-left: 60px;
  align-items: center;
  display: flex;
  flex-direction: column;
  ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;
export const Paragraph = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin-top: -10px;
  margin-left: 20px;
  margin-right: 20px;
`;
