import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Message(props) {
  console.log('Received infoMessage:', props.infoMessage);
  return props.infoMessage ? <div id="message">{props.infoMessage}</div> : null;
}

const mapStateToProps = (state) => {
  return {
    infoMessage: state.infoMessage,
  };
};

export default connect(mapStateToProps)(Message);