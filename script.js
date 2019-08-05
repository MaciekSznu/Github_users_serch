//APP
class App extends React.Component {
  constructor() {
    super();
    this.state = {//inicjujemy stan komponentu
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {//dynamicznie reaguje na zmiany treści inputa
    this.setState({searchText: event.target.value})
  }

  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;
    const url = 'https://api.github.com/search/users?q=' + searchText;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({users: responseJson.items}));
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">Search by user name </label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}
          />
        </form>
        <UsersList users={this.state.users}/>
      </div>
    );
  }
}

//USER LIST
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

//USER
class User extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}
//avatar_url oraz html_url otrzymujemy w odebranych z serwera właściwościach

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
