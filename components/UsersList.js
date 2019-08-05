class UsersList extends React.Component {
  get users() {// getter przekształcam tablicę otrzymaną z App
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}