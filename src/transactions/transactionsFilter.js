import React from 'react';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const TransactionsFilter = ({ value, onChangeHandler }) =>
  <SelectField
    floatingLabelText="Filter"
    value={value}
    onChange={onChangeHandler}
    fullWidth
  >
    <MenuItem value={'all'} primaryText="Alle" />
    <Divider />
    <MenuItem value={'sent'} primaryText="Gesendet" />
    <Divider />
    <MenuItem value={'received'} primaryText="Erhalten" />
  </SelectField>;

export default TransactionsFilter;
