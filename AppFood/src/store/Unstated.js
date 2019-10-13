import { Container } from 'unstated';

class Unstated extends Container {
    constructor(props){
        super(props)
        this.state={
            account: {},
        }
    }

    setAccount(key, value){
        if(key === 'account'){
            console.warn('aaa', value)
            this.setState({account: value})
        }
    }
}

export default new Unstated();