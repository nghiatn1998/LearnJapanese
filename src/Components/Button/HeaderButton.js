import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';
import {Normalize} from '../../Themes'

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={Normalize(23)}
      color={'white'}
    />
  );
};

export default CustomHeaderButton;
