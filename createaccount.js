function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        return false;
      }
      return true;
  }

  function handleCreate(){
    console.log(name,email,password);
    if (!validateAll()) return 
    ctx.users.push({name,email,password,balance:100});
    setShow(false);
  }    

  function validateAll(){
  if (!validate(name,     'name'))     return false;
  if (!validate(email,    'email'))    return false;
  if (!validate(password, 'password')) return false;

  return true
  }

  
  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-info" onClick={handleCreate} disabled={!validateAll()}><p>Create</p></button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-info" onClick={clearForm}>Add another account</button>
              <button type="submit" className="btn btn-info" onClick={clearForm}>Get your $200 Bonus</button>
              </>
            )}
    />
  )
}
