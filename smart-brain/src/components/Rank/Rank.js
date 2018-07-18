import React from 'react';
import './Rank.css'

class Rank extends React.Component {

	constructor(){
		super();
		this.state = {
			emoji: ''
		}
	}

	componentDidMount(){
		this.generateEmoji(this.props.entries)
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.entries === this.props.entries && prevProps.name === this.props.name){
			return null
		}
		this.generateEmoji(this.props.entries)
	}

	generateEmoji = (entries) => {
		fetch(`https://9wqf9zafbj.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
			.then(response => response.json() )
			.then(data => this.setState({emoji: data.input}))
			.catch(console.log)
	}

	render() {
		return (
			<div className = "rank">
				<div className = 'rank1'>
					{`${this.props.name} , your current entry count is...`}
				</div>
				<div className = 'rank2'>
					{this.props.entries}
				</div>
				<div className = 'rank3'>
					{`Rank Badge: ${this.state.emoji}`}
				</div>
			</div>	
		);	
	}
}


	


export default Rank;