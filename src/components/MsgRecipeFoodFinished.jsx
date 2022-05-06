import React from 'react';

class MsgRecipeFoodFinished extends React.Component {
  render() {
    return (
      <section className="boxMsgFinished">
        <h4 className="msgRecipeFinished">
          Recipe is Finished
        </h4>
        <button
          className="btnDoItAgain"
          type="button"
        >
          Do it again!?
        </button>
      </section>
    );
  }
}

export default MsgRecipeFoodFinished;
