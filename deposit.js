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

  function errorAware(e){
    if ((e.currentTarget.value) === '') {
      setStatus('');
      return;
    }

    const input = Math.round(e.currentTarget.value * 100) / 100;
    if (Number.isNaN(input)) {
      setStatus('Transaction failure: Reponse must be a number');
    } else if (input < 0) {
      setStatus('Transaction failure: Response must be a positive number');
    } else if (input===0){
      setStatus('Transaction failure: Response can not be 0');
    } else {
      setDeposit(input);
      setStatus('');
    }
  }


  function depositInput(){
    console.log(deposit);
    if (!validate(deposit, 'You must enter a valid deposit amount')) return;
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
      header="Make a Deposit"
      status={status}
      body={show ? (
              <>
              <div><p>Your Balance: <strong>${ctx.activeUser.balance.toFixed(2)}</strong></p></div>
              <h1>Deposit Amount</h1>
              <input className="form-control" id="deposit" placeholder="0.00" onChange={errorAware} /><br/>
             
              <button type="submit" className="btn btn-info" onClick={depositInput} disabled={deposit === 0}><p>Make Deposit</p></button>
              </>
            ):(
              <>
              <h2>Your deposit was successful</h2>
              <button type="submit" className="btn btn-info" onClick={clearForm}><p>Make an additional deposit?</p></button>
              </>
            )}
    />
  )
}




