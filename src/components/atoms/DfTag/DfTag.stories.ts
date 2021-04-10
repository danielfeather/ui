import DfTag from './DfTag.vue';

export default {
  title: 'Components/Atoms/Tag',
  component: DfTag,
  argTypes: {
    content: { control: 'text' },
    variant: { control: { type: 'select', options: ['info', 'success', 'warning', 'danger'] } },
  },
};

const Template = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DfTag },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<DfTag v-bind="args">{{ args.content }}</DfTag>',
});

export const Default = Template.bind({});
Default.args = {
  content: 'Default'
}