import React from 'react';
import EditContact from './EditContact';
import Contact from './Contact';
import IfElse from '../shared/IfElse';

export default class MainContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
    this.handleEdit = () => {
      this.setState({ isEditing: true });
    };
    this.handleCancel = () => {
      this.setState({ isEditing: false });
    };
  }
  render() {
    return (
      <IfElse predicate={this.state.isEditing}>
        <EditContact handleCancel={this.handleCancel}
          contact={this.props}/>
        <Contact handleEdit={this.handleEdit}
          {...this.props}/>
      </IfElse>);
  }
}
