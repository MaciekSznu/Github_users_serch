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
    const url = 'https://api.github.com/search/users?q=${searchText}';
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({users: responseJson.items}));
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">Search by user name</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}
          />
        </form>
        <UserList users={this.state.users}/>
      </div>
    );
  }
}