import React, {Component} from 'react';
import {
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';

export default class LoadingModal extends Component {
    constructor(props){
        super(props);
        this.state={
            isVisible: false
        }
    }
    hideModal=()=>{
        this.setState({isVisible: false})
    }
    showModal=()=>{
        this.setState({isVisible: true})
    }
    render(){
        return(
            <Modal
			isVisible={this.state.isVisible}
			style={{justifyContent: 'center'}}
			>
				<ActivityIndicator size="large" color="#0000ff" />
			</Modal>
        )
    }
}