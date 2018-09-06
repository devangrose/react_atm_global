import React, { Component } from 'react';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
      message: '',
      messageClass:'hidden'
    };

    this.handleDepositClick = this.handleDepositClick.bind(this);
    this.handleWithdrawClick = this.handleWithdrawClick.bind(this);
  }

  handleDepositClick(e) {
    e.preventDefault();
    if (isNaN(this.refs.amount.value) || parseInt(this.refs.amount.value) < 0) {
      console.log("Not a number");
      this.setState({
        message:'That is not a valid input!',
        messageClass:''
      });
    }
    else {
      let amount = +this.refs.amount.value;
      let newBalance = this.state.balance + amount;
      this.setState({
        balance: newBalance,
        message:'',
        messageClass:'hidden'
      });
      this.refs.amount.value = '';
    }
  }
  handleWithdrawClick(e) {
    e.preventDefault();
    if (isNaN(this.refs.amount.value) || parseInt(this.refs.amount.value) < 0) {
      console.log("Not a number");
      this.setState({
        message:'That is not a valid input!',
        messageClass:''
      });
    }
    else if (parseInt(this.refs.amount.value) > this.state.balance) {
      console.log("Too much!");
      this.setState({
        message:'Not enough funds!',
        messageClass:''
      });
    }
    else {
      let amount = +this.refs.amount.value;
      let newBalance = this.state.balance - amount;
      this.setState({
        balance: newBalance,
        message:'',
        messageClass:'hidden'
      });
      this.refs.amount.value = '';
    }
  }

  render() {
    let balanceClass = 'balance';
    if (this.state.balance === 0) {
      balanceClass += ' zero';
    }

    return (
      <div className="account">
        <h2>{this.props.name}</h2>
        <div className={balanceClass}>${this.state.balance}</div>
        <input type="text" placeholder="enter an amount" ref="amount" />
        <input type="button" value="Deposit" onClick={this.handleDepositClick} />
        <input type="button" value="Withdraw" onClick={this.handleWithdrawClick} />
        <div>
          <p class={this.state.messageClass}>{this.state.message}</p>
        </div>
      </div>

    )
  }
}
