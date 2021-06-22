import React from 'react';
import onClickOutside from 'react-onclickoutside';
import './DropDownList.css';

interface IDropDownListState {
    isOpen: boolean
}

interface IDropDownListProps {
    image: string
}

class DropDownList extends React.Component<IDropDownListProps, IDropDownListState> {
    constructor(props: IDropDownListProps) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    onOpen = () => this.setState(prevState => ({isOpen: !prevState.isOpen}))

    handleClickOutside = (evt: any) => {
        if(this.state.isOpen)
            this.setState({isOpen: false});
    }
    
    render() {
        const {isOpen} = this.state;

        // const children = isOpen ? this.props.children : undefined;
        
        return(
            <div>
                {/* header */}
                <div>
                    <div className="tc" onClick={this.onOpen}>
                        <img
                            src={this.props.image}
                            className="br-100 ba h3 w3 dib" alt="avatar" />
                    </div>
                </div>
                {/* content */}
                {isOpen ? 
                    <div className='content list pl0 ml0 center mw5 ba b--light-silver br3' onClick={() => this.setState({isOpen: false})}>
                        {this.props.children}
                    </div>
                : undefined}
                
            </div>
        )
    }
}

export default onClickOutside(DropDownList);