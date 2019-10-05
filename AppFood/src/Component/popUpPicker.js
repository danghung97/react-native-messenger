import React, { Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icons from "react-native-vector-icons/AntDesign"
import Modal from 'react-native-modal'

const ICON_SIZE = 30

export default class BottomSheetDialog extends Component{

    render(){

        return(
            <Modal isVisible={this.props.isVisible}
                onBackdropPress={ () => this.props.closeModal()}
                onBackButtonPress={() => this.props.closeModal()}
                onSwipeComplete={() => this.props.closeModal()}
                style={style.container}
                swipeDirection={["down"]}
            >
                <View style={style.childContainer}>
                    <TouchableOpacity style={style.rectangle} onPress={() => this.props.openImage()}>
                        <Icons name="camera" size={ICON_SIZE}/>

                    </TouchableOpacity>

                    <TouchableOpacity style={style.rectangle} onPress={() => this.props.pickerImage()}>
                        <Icons name="user" size={ICON_SIZE} />
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        margin: 0
    },
    childContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        flexDirection: "row"
    },
    rectangle: {
        alignItems: "center",
        width: '50%'
    }
})