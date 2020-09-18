import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';

const HeaderButtonCustom = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={props.IconComponent}
      iconSize={23}
      color={'white'}
    />
  );
};

export default HeaderButtonCustom;
