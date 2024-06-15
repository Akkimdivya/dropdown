import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text' },
    labelVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
    status: { control: 'radio', options: ['Unfilled', 'Filled', 'Disabled', 'Error'] },
    labelIconVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
    leftIconVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
    helperText: { control: 'text' },
    required: { control: 'radio', options: ['Yes', 'No'] },
    text: { control: 'text' },
    type: { control: 'radio', options: ['SingleNoIcon', 'SingleRadio', 'Multi'] },
    activeItemIndex: { control: 'number' },
    items: { control: 'array' },
  },
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  labelVisibility: "Visible",
  status: "Unfilled",
  labelIconVisibility: "Visible",
  leftIconVisibility: "Visible",
  helperText: "This is a helper text",
  required: "No",
  text: "Select an option",
  type: "SingleNoIcon",
  activeItemIndex: -1,
  items: ['Select 1', 'Select 2', 'Select 3'],
  onItemSelected: (index) => console.log('Selected:', index),
};
