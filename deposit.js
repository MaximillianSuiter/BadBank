function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [deposit, setDeposit]   = React.useState(0);
  const ctx = React.useContext(UserContext);


  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }

      return true;
  }

  function handleErrors(e){
    if ((e.currentTarget.value) === '') {
      setStatus('');
      return;
    }

    const notrounded = Number.parseInt(e.currentTarget.value);
    const input = Math.round(notrounded * 100) / 100;
      if (Number.isNaN(input)) {
      setStatus('Transaction failure: Reponse must be a number');
    } else if (input < 0) {
      setStatus('Transaction failure: Response must be a positive number');
    } else {
      setDeposit(input);
      setStatus('');
    }
  }

  function handleDeposit(){
    console.log(deposit);
    if (!validate(deposit, 'Transaction failure: No deposit amount entered')) return;
    ctx.activeUser.balance += deposit;
    setShow(false);
  }

  function clearForm(){
    setDeposit(0);
    setShow(true);
  }

  return (
    <Card
      bgcolor="success"
      header="Deposit"
      status={status}
      body={show ? (
              <>
              <div><p>Your Balance: <strong>${ctx.activeUser.balance.toFixed(2)}</strong></p></div><br/>
             <h1>Deposit Amount</h1>
              <input className="form-control" id="deposit" placeholder="0.00" onChange={handleErrors} /><br/>
             
              <div><button type="submit" className="btn btn-info" onClick={handleDeposit} disabled={deposit === 0.00}><h2>Make Deposit</h2></button></div>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-info" onClick={clearForm}><p>Make another deposit</p></button>

          
              </>
              
            )}
    />
  )
}
