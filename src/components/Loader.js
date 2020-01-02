import React, { Component } from 'react'

export class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }
    componentDidMount() {
        this.setState({isLoading: false})
    }
    render() {
        return (
            <div>
                {this.props.data}
            </div>
        )
    }
}

export default Loader
