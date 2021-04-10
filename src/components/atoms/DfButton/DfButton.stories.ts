import DfButton from './DfButton.vue';

export default {
  title: 'Components/Atoms/Button',
  component: DfButton,
  argTypes: {
    content: { control: 'text' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    onClick: {},
  },
};

const Template = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DfButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<DfButton v-bind="args">{{ args.content }}</DfButton>',
});

export const Default = Template.bind({});
Default.args = {
  content: 'Button'
}