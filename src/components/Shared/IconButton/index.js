import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButtonContainer, ButtonGroup, ButtonIcon, ButtonLabel, DisplayPopular } from './styles';

const IconButton = (props) => {

  const {
    label,
    icon,
    isPopular,
    handleOnClick
  } = props

  const {t}=useTranslation()

  return (
    <IconButtonContainer onClick={handleOnClick}>
      <ButtonGroup>
        <ButtonIcon>
          <img src={icon} alt={label} />
          <ButtonLabel>
            {label}
          </ButtonLabel>
        </ButtonIcon>
        {isPopular && (
          <DisplayPopular>{t("Popular")}</DisplayPopular>
        )}
      </ButtonGroup>
    </IconButtonContainer>
  )
}

export default IconButton;
