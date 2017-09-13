import React from 'react';
// Components
import NavBar from './NavBar';
import Project from './Project';

class Portfolio extends React.Component {
	constructor() {
		super();

		this.state = {
      		loading  : true,
      		error    : null,
      		projects : [
      			{
      				title: 'PiDash',
      				date: 'July 2nd, 2017',
      				text: 'A dashboard app for Raspberry Pi using React',
      				tech: [
      					{key: 0, label: 'React'},
      					{key: 1, label: 'Webpack'},
      					{key: 2, label: 'SCSS'},
      					{key: 3, label: 'Node'}
      				],
      				key: 0
      			},
      			{
      				title: 'Ninety Music',
      				date: 'July 2nd, 2017',
      				text: 'A music player powered by the SoundCloud API',
      				tech: [
      					{key: 0, label: 'React'},
      					{key: 1, label: 'Webpack'},
      					{key: 2, label: 'SCSS'},
      					{key: 3, label: 'Node'}
      				],
      				key: 1
      			}
      		]
		};
	}

	renderProjects() {
		let portfolio = [];

		this.state.projects.map(function(p) {
			portfolio.push(
				<Project title={p.title} date={p.date} description={p.text} key={p.key} chips={p.tech}/>
			);
		});

		return portfolio;
	}

	render() {
		return (
			<div>
				<NavBar />
				<div className="portfolio">

					<div className="clearfix" />
					
					<h4 className="portfolio__header">
						Some Recent Projects
					</h4>

					<div className="project__wrapper">
						{this.renderProjects()}
					</div>
				</div>
			</div>
		);
	}

};

export default Portfolio;