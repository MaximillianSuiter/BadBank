function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [withdraw, setWithdraw] = React.useState(0);
  const ctx = React.useContext(UserContext);

  // Disable submit button until withdrawal amount is entered
  // Make pesky 0 before deposit amount disappear
  // Message to user for overdraft
  // Message to user for NaN

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
      setWithdraw(0);
      return;
    }
    const notrounded = Number.parseFloat(e.currentTarget.value);
    const input = Math.round(notrounded * 100) / 100;
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
      console.log('setting withdrawal to ' + input);
      setWithdraw(input);
      setStatus('');
    }
  }

  function handleWithdraw(){
    console.log('current balance is: ' + ctx.activeUser.balance);
    console.log('withdrawal amount: ' + withdraw);
    if (!validate(withdraw, 'No withdrawal amount has been entered')) return;
    ctx.activeUser.balance = ctx.activeUser.balance - withdraw;
    console.log('current balance is: ' + ctx.activeUser.balance);
    setShow(false);
  }

  function clearForm(){
    setWithdraw(0);
    setShow(true);
  }

  return (
    <Card
      bgcolor="warning"
      header="Withdraw"
      status={status}
      body={show ? (
              <>
              <div><p>Your Balance: <strong>${ctx.activeUser.balance.toFixed(2)}</strong></p></div><br/>
              <h1>Withdrawal Amount</h1>
              <input className="form-control" id="withdraw" placeholder="0.00" onChange={handleErrors} /><br/>
              <button type="submit" className="btn btn-info" onClick={handleWithdraw} disabled={withdraw === 0.00}><h2>Withdraw</h2></button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-info" onClick={clearForm}><p>Make another withdrawal</p></button>
              </>
            )}
    />
  )
}
