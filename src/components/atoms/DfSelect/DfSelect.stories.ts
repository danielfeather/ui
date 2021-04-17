import DfSelect from './DfSelect.vue';

export default {
  title: 'Components/Atoms/Select',
  component: DfSelect,
  argTypes: {
    options: {
      control: 'object'
    }
  },
};

const Template = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DfSelect },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<DfSelect v-bind="args">{{ args.content }}</DfSelect>',
});

export const Single = Template.bind({});
Single.args = {
  options: ['Option 1', 'Option 2', 'Option 3']
}

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  options: ['Option 1', 'Option 2', 'Option 3']
}