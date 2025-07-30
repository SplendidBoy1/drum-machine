import React from 'react';
import { connect } from 'react-redux';


//create Redux actions
const Change_Display = (display) => {
  return {
    type: 'CHANGE_DISPLAY',
    display
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    Change_Display: (display) => dispatch(Change_Display(display)),
  }
}

const mapStateToProps = (state) => {
  return {
    volume: state.volume
  }
}

class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize state if needed
    };
    this.playSound = this.playSound.bind(this);
  }
    playSound(id) {
        
      const audio = document.getElementById(id);
      if (audio) {
        audio.volume = parseFloat(this.props.volume); // Set volume from props
        audio.currentTime = 0; // Reset audio to start
        audio.play();
      }
      this.props.Change_Display(this.props.audioclip.description);
    }
  render() {
    // Render the drum component
    return (
      <button className="drum-pad" id={`drum-${this.props.audioclip.id}`} onClick={() => this.playSound(this.props.audioclip.id)}>
        {/* Drum content goes here */}
        <h3>{this.props.audioclip.id}</h3>
        <audio className="clip" id={this.props.audioclip.id} src={this.props.audioclip.src}></audio>
        {/* Add any additional content or styling */}
      </button>
    );
  }
}

const ConnectedDrum = connect(mapStateToProps, mapDispatchToProps)(Drum);

export default ConnectedDrum;