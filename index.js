function Spa() {
  const newUser = {
    name: 'Max',
    email: 'max@abc.com',
    password: 'secret',
    balance: 100
  };

  return (
    <HashRouter>
      <NavBar/>
      <UserContext.Provider value={
        {
          users: [newUser],
          activeUser: newUser
        }
        }>
        <div className="container" style={{padding: "20px"}}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);