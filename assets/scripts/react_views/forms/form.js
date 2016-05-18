var Form = React.createClass({
  componentWillMount: function () {
    this.inputs = {}; // We create a map of traversed inputs
    this.registerInputs(this.props.children); // We register inputs from the children
  },
  registerInputs: function (children) {

    // A React helper for traversing children
    React.Children.forEach(children, function (child) {

      // We do a simple check for "name" on the child, which indicates it is an input.
      // You might consider doing a better check though
      if (child.props.name) {

        // We attach a method for the input to register itself to the form
        child.props.attachToForm = this.attachToForm;

        // We attach a method for the input to detach itself from the form
        child.props.detachFromForm = this.detachFromForm;
      }

      // If the child has its own children, traverse through them also...
      // in the search for inputs
      if (child.props.children) {
        this.registerInputs(child.props.children);
      }
    }.bind(this));
  },

  // All methods defined are bound to the component by React JS, so it is safe to use "this"
  // even though we did not bind it. We add the input component to our inputs map
  attachToForm: function (component) {
    this.inputs[component.props.name] = component;
  },

  // We want to remove the input component from the inputs map
  detachFromForm: function (component) {
    delete this.inputs[component.props.name];
  },
  render: function () {
    return (
      <form>
        {this.props.children}
        <button type="submit">Submit</button>
      </form>
    );
  }
});
