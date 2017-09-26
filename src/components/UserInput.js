import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const UserInput = ({
  settings,
  generations,
  handleInputChange,
  handleUpClick,
  handleDownClick,
  handlePauseClick,
  handleResetClick,
  handleStartClick
}) => {
  const UserInputContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  padding: 30px 0;
  background: white;
  box-shadow: 6px 6px 10px -6px;
  font-size: 18px;
}

  button {
    padding: 0;
    margin-left: 2px;
    height: 45%;
    width: 20px;
    color: white;
    background: black;
    border: none;
    &:focus {
      outline: none;
    }
  }
  `;

  const Title = styled.h1`
    margin: 10;
    text-align: center;
    letter-spacing: 2px;
  `;

  const UserInputForm = styled.form`
    display: flex;
    justify-content: space-evenly;
  `;

  const Buttons = styled.div`
    div:first-of-type {
      text-align: center;
      text-transform: uppercase;
    }
    button {
      width: 40px;
      color: white;
      background: black;
      border: none;
      text-transform: uppercase;
      border-right: 1px solid white;
      &:last-of-type {
        border-right: none;
      }
    }
  `;

  const Settings = styled.div`display: flex;`;

  const Setting = styled.div`
  display: flex;
  margin-left: 8px;
  padding-left: 2px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  box-sizing: border-box;
  overflow: hidden;
  label {
    display: block;
    height: 20px;
    width: 80px;
    font-size: 18px;
    text-transform: uppercase;
  }
  input {
    box-sizing: border-box;
    width: 80px;
    margin: 0;
    padding: 0;
    font-size: 11px;
    &:focus {
      outline: none;
    }
  `;

  const ButtonArrows = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    button {
      width: 20px;
    }
  `;

  return (
    <UserInputContainer>
      <Title>Conway's Game of Life</Title>
      <UserInputForm onChange={handleInputChange}>
        <Buttons>
          <div>Generations: {generations}</div>
          <div>
            <button onClick={handleStartClick}>Start</button>
            <button onClick={handlePauseClick}>Pause</button>
            <button onClick={handleResetClick}>Reset</button>
          </div>
        </Buttons>
        <Settings>
          {Object.keys(settings).map(key => {
            return (
              <Setting>
                <label for={key}>
                  {key}
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={settings[key]}
                    onChange={handleInputChange}
                  />
                </label>
                <ButtonArrows>
                  <button name={key} type="button" onClick={handleUpClick}>
                    &#8679;
                  </button>
                  <button name={key} type="button" onClick={handleDownClick}>
                    &#8681;
                  </button>
                </ButtonArrows>
              </Setting>
            );
          })}
        </Settings>
      </UserInputForm>
    </UserInputContainer>
  );
};

UserInput.propTypes = {
  settings: PropTypes.object,
  generations: PropTypes.number,
  handleInputChange: PropTypes.func,
  handleUpClick: PropTypes.func,
  handleDownClick: PropTypes.func,
  handlePauseClick: PropTypes.func,
  handleResetClick: PropTypes.func,
  handleStartClick: PropTypes.func
};

export default UserInput;
