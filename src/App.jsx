import { useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import {FaArrowsAlt, FaCompressAlt} from 'react-icons/fa'
import { BiRotateRight } from 'react-icons/bi';
import { FaRotate } from 'react-icons/fa6';
import { connect } from 'react-redux';
import Drum from './Drum.jsx';


const audioClips = [
  { id: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', description: 'Heater-1' },
  { id: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', description: 'Heater-2' },
  { id: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', description: 'Heater-3' },
  { id: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', description: 'Heater-4_1' },
  { id: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', description: 'Heater-6' },
  { id: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', description: 'Dsc_Oh' },
  { id: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', description: 'Kick_n_Hat' },
  { id: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', description: 'RP4_KICK_1' },
  { id: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', description: 'Cev_H2' }
]

// const Change_Content = (content) => {
//   return {
//     type: 'CHANGE_CONTENT',
//     content
//   }
// }

// const Toggle_Preview = () => {
//   return {
//     type: 'TOGGLE_PREVIEW',
//   }
// }

// const Toggle_Edit = () => {
//   return {
//     type: 'TOGGLE_EDIT',
//   }
// }

const Change_Display = (display) => {
  return {
    type: 'CHANGE_DISPLAY',
    display
  }
}

const Change_Volume = (volume) => {
  return {
    type: 'CHANGE_VOLUME',
    volume
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Change_Display: (display) => dispatch(Change_Display(display)),
    Change_Volume: (volume) => dispatch(Change_Volume(volume)),
  }
}

const mapStateToProps = (state) => {
  return {
    display: state.display,
    volume: state.volume
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     Change_Content: (content) => dispatch(Change_Content(content)),
//     Toggle_Preview: () => dispatch(Toggle_Preview()),
//     Toggle_Edit: () => dispatch(Toggle_Edit())
//   }
// }


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0.5
    };
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  PlayKeyDown(event){
    const key = event.key.toUpperCase();
    const clip = audioClips.find(clip => clip.id === key);
    
    const audio = document.getElementById(key);
    if (audio){
      const parentButton = audio.parentNode;
      parentButton.classList.add('active');
      
      parentButton.click();
    }
  }

  handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    this.setState({ volume: newVolume });
    this.props.Change_Volume(newVolume);
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => this.PlayKeyDown(event));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (event) => this.PlayKeyDown(event));
  }

  render() {
    
    // Render the main app structure
  return (
    <div className="background">
      <div id='drum-machine'>
        <div className='whole-drum'>
          {audioClips.map((audioclip) => {
            return <Drum audioclip={audioclip} key={audioclip.id}/> 
          }
        )}
        </div>
        <div className='options-display'>
          <p id='display'>{this.props.display}</p>
          <div className="volume-slider">
            <input max="1" min="0" step="0.01" type="range" value={this.state.volume} onChange={this.handleVolumeChange}/>
          </div>
        </div>
        
      </div>
    </div>
  )
}
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


export default ConnectedApp;
