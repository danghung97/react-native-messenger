import React, {Component} from 'react';
import{
    View,
    ScrollView,
    StyleSheet,
    Text,
    RefreshControl,
} from 'react-native';
import Avatar from '../Component/avatar'
import Unstated from '../store/Unstated';
import axios from 'axios';

export default class ProfileScreen extends Component{
    constructor(props){
        super(props);
        this.account = Unstated.state.account;
        this.state={
            refreshing: false
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true})
        // axios.get("https://serverappfood.herokuapp.com/api/user/login",{
        //     headers:{
        //         Accept: 'application/json'
        //     }
        // }).then(res=>console.log(res))
    }
    render(){
        const {refreshing} = this.state
        
        const {email, name, address, phone} = this.account
        return(
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={()=>this.onRefresh()} />
              }
            style={{width: '100%', display: "flex"}}>
                <View style={styles.part1} />
                <View style={styles.avatar}>
                    <Avatar uri={this.account.Avatar} navigation={this.props.navigation}/>
                </View>
                <View style={styles.containerInput}>
                    <View style={styles.rectangle}>
                        <Text style={styles.Text}>Name: </Text>
                        {!!name && <Text style={styles.Text}>
                            {name}
                        </Text>}
                    </View>
                    <View style={styles.rectangle}>
                        <Text style={styles.Text}>Address: </Text>
                        {!!address && <Text style={styles.Text}>
                            {address}
                        </Text>}
                    </View>
                    <View style={styles.rectangle}>
                        <Text style={styles.Text}>Number phone: </Text>
                        {!!phone && <Text style={styles.Text}>
                        {phone}
                        </Text>}
                    </View>
                    <View style={styles.rectangle}>
                        <Text style={styles.Text}>Email: </Text>
                        {!!email && <Text style={styles.Text}>
                        {email}
                        </Text>}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    part1:{
        height: 220,
        backgroundColor: 'skyblue',
        width: '100%',
    },
    avatar:{
        alignSelf: 'center',
        position: "absolute",
        marginTop: 160
    },
    containerInput:{
        width: '100%',
        marginLeft: 40,
        marginTop: 60,
        paddingTop: 25
    },
    rectangle: {
        marginTop: 20,
        flexDirection: 'row'
    },
    Text: {
        height: 44,
        borderColor: 'black',
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '500'
    }
})