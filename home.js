function Home(){
  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="BadBank"
      title="Welcome to financial bliss"
      text="Open an account today to receive a $200 bonus! Offer ends soon. "
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}