function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [withdraw, setWithdraw] = React.useState(0);
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
      setWithdraw(0);
      return;
    }

    const input = Math.round(e.currentTarget.value * 100) / 100;
    if (Number.isNaN(input)) {
      setStatus('Transaction failure: Reponse must be a number');
      setWithdraw(0);
    } else if (input < 0) {
      setStatus('Transaction failure: Response must be a positive number');
      setWithdraw(0);
    } else if (input > ctx.activeUser.balance) {
      setStatus('Transaction failure: Response must not exceed your current balance');
      setWithdraw(0);
    }
    else {
      console.log('set withdrawal to ' + input);
      setWithdraw(input);
      setStatus('');
    }
  }

  function withdrawalInput(){
    console.log('Your balance is: ' + ctx.activeUser.balance);
    console.log('Withdrawal amount: ' + withdraw);
    if (!validate(withdraw, 'Please enter a valid amount to withdraw')) return;
    ctx.activeUser.balance = ctx.activeUser.balance - withdraw;
    console.log('Your balance is: ' + ctx.activeUser.balance);
    setShow(false);
  }

  function clearForm(){
    setWithdraw(0);
    setShow(true);
  }

  return (
    <Card
      bgcolor="warning"
      header="Make a Withdrawal"
      status={status}
      body={show ? (
        <>
        <div><p>Your Balance: <strong>${ctx.activeUser.balance.toFixed(2)}</strong></p></div>
        <h1>Withdrawal Amount</h1>
        <input className="form-control" id="deposit" placeholder="0.00" onChange={errorAware} /><br/>

        <button type="submit" className="btn btn-info" onClick={withdrawalInput} disabled={withdraw === 0.00}><p>Make Withdrawal</p></button>
        </>
        ):(
        <>
        <h2>Your deposit was successful</h2>
        <button type="submit" className="btn btn-info" onClick={clearForm}><p>Make An Additional Withdrwal?</p></button>
        </>
        )}
    />
  )
}






