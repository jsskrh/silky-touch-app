import React, { Component } from "react";
//import the library
import {
  useMonnifyPayment,
  MonnifyButton,
  MonnifyConsumer,
  MonnifyHookExample,
} from "react-monnify";

class MonnifyPayment extends Component {
  state = {
    amount: 5000,
    currency: "NGN",
    reference: "" + Math.floor(Math.random() * 1000000000 + 1),
    customerFullName: "John Doe",
    customerEmail: "monnify@monnify.com",
    customerMobileNumber: "08121281921",
    paymentDescription: "Lahray World",
    apiKey: "MK_TEST_490NQEUF58",
    contractCode: "5177040622",
    paymentDescription: "Test Pay",
    isTestMode: true,
    metadata: {
      name: "Damilare",
      age: 45,
    },
    config: {
      amount: 100,
      currency: "NGN",
      reference: `${new String(new Date().getTime())}`,
      customerName: "Damilare Ogunnaike",
      customerEmail: "ogunnaike.damilare@gmail.com",
      apiKey: "MK_PROD_FLX4P92EDF",
      contractCode: "626609763141",
      paymentDescription: "Lahray World",
      metadata: {
        name: "Damilare",
        age: 45,
      },
      isTestMode: true,
      customerPhoneNumber: "09123856264",
    },
    componentProps: {
      options: {
        amount: 100,
        currency: "NGN",
        reference: `${new String(new Date().getTime())}`,
        customerName: "Damilare Ogunnaike",
        customerEmail: "ogunnaike.damilare@gmail.com",
        apiKey: "MK_PROD_FLX4P92EDF",
        contractCode: "626609763141",
        paymentDescription: "Lahray World",
        metadata: {
          name: "Damilare",
          age: 45,
        },
        isTestMode: true,
        customerPhoneNumber: "09123856264",
      },
      text: "Pay With Monnify Button example",
      className: "btn",
      onLoadStart: () => {
        console.log("loading has started");
      },
      onLoadComplete: () => {
        console.log("SDK is UP");
      },

      onComplete: function (response) {
        //Implement what happens when the transaction is completed.
        console.log("response", response);
      },
      onClose: function (data) {
        //Implement what should happen when the modal is closed here
        console.log("data", data);
      },
    },
  };

  onComplete = (response) => {
    console.log(response); // card charged successfully, get reference here
  };

  close = (response) => {
    console.log(response);
  };

  // const componentProps = {
  //   options: config,
  //   text: 'Pay With Monnify Button example',
  //   className: 'btn',
  //   onLoadStart: () => {
  //     console.log('loading has started')
  //   },
  //   onLoadComplete: () => {
  //     console.log('SDK is UP')
  //   },

  //   onComplete: function (response) {
  //     //Implement what happens when the transaction is completed.
  //     console.log('response', response)
  //   },
  //   onClose: function (data) {
  //     //Implement what should happen when the modal is closed here
  //     console.log('data', data)
  //   },
  // }

  render() {
    return (
      <>
        {/* <div>
          <MonnifyHookExample className="btn" />
        </div> */}
        <div>
          <p>
            <MonnifyButton
              text="Make Payment"
              className="payButton"
              onComplete={this.onComplete}
              close={this.close}
              disabled={true} // disable payment button
              embed={true} // payment embed in your app instead of a pop up
              customerFullName={this.state.customerFullName}
              customerEmail={this.state.customerEmail}
              customerMobileNumber={this.state.customerMobileNumber}
              paymentDescription={this.state.paymentDescription}
              amount={this.state.amount}
              apiKey={this.state.apiKey}
              contractCode={this.state.contractCode}
              reference={this.state.reference}
              tag="button" // it can be button or a or input tag
            />
          </p>
        </div>
        <div>
          <MonnifyConsumer
            {...this.state.componentProps}
            //       options= config
            // text= "Pay With Monnify Button example"
            // className= "btn"
            // onLoadStart= () => {
            //   console.log("loading has started");
            // }
            // onLoadComplete= () => {
            //   console.log("SDK is UP");
            // }

            // onComplete= function (response) {
            //   //Implement what happens when the transaction is completed.
            //   console.log("response", response);
            // }
            // onClose= function (data) {
            //   //Implement what should happen when the modal is closed here
            //   console.log("data", data);
            // }
          >
            {/* <MonnifyConsumer className="btn"> */}
            {({ initializePayment }) => (
              <button onClick={() => initializePayment()}>
                Monnify Consumer Implementation
              </button>
            )}
          </MonnifyConsumer>
        </div>
      </>
    );
  }
}

export default MonnifyPayment;
