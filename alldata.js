function AllData(){
  const ctx = React.useContext(UserContext);
  return (
    <>
    <h5>BadBank Active Users</h5>
    <br/>
    <table class="table table-info table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">User Balance</th>
        </tr>
      </thead>
      <tbody>
        {
          ctx.users.map(
            (user, i) =>
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>${user.balance.toFixed(2)}</td>
              </tr>
          )
        }
      </tbody>
    </table>
    </>
  );
}