import React from 'react';
import { connect } from 'react-redux';
import { postForm, resetError } from './actions';
// Components
import NavBar from './NavBar';
import Loading from './Loading';
import FormError from './Error';

const mapStateToProps = state => ({
    success: state.portfolioState.success,
    loading: state.portfolioState.loading,
    error: state.portfolioState.error
});

const mapDispatchToProps = dispatch => ({
    postForm: data => dispatch(postForm(data)),
    resetError: () => dispatch(resetError())
});

// Email validation RegExp
const validateEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Reusable validation constuctor for each input
let validationObj = function() {
    this.valid = false;
    this.dirty = false;
};

class Contact extends React.Component {
	constructor() {
		super();

		this.state = {
      		loading : true,
      		error   : null,
      		name: '',
            email: '',
            message: '',
            validation: {
                name: new validationObj(),
                email: new validationObj(),
                message: new validationObj()
            }
		};

		this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrorClass = this.handleErrorClass.bind(this);
	}

	/**
     * Loading Spinner
     *
     * @return LoadingSpinner component
     */
    renderLoading() {
    	if(this.props.loading) {
    		return <Loading />;
    	} else if(this.props.error) {
    		return <FormError close={this.props.resetError} />;
    	}
    }

	/**
     * Validate Inputs
     *
     * @return valid - validation status 
     */
    validateInputs() {
        let valid = true;
        // Check for incompleted fields
        for (let key in this.state.validation) {
            if (!this.state.validation[key]['valid']) {
                return false;
            }
        }

        return valid;
    }

    /**
     * Validate/Mask inputs as the user types
     *
     * @param event - DOM event info
     * @state - Send validation status to state
     */
    onChange(event) {
        // create a shallow copy of the state to mutate
        let obj = Object.assign({}, this.state);
        // Set value in obj to eventually send to the state
        obj[event.target.name] = event.target.value;
        // Validate inputs
        // Mark input as dirty (interacted with)
        obj['validation'][event.target.name]['dirty'] = true;

        if (event.target.name === 'email') {
            // Validate email address
            if (validateEmail.test(event.target.value)) {
                obj['validation'][event.target.name]['valid'] = true;
            } else {
                obj['validation'][event.target.name]['valid'] = false;
            }
        } else {
            // If there is any value for non-email inputs, mark it valid
            if (event.target.value !== '') {
                obj['validation'][event.target.name]['valid'] = true;
            } else {
                obj['validation'][event.target.name]['valid'] = false;
            }
        }

        this.setState(obj);
    }

    /**
     * Handle Error classNames for each input
     *
     * @param name - Input name
     * @return className - return class depending on validation status
     */
    handleErrorClass(name) {
        let className;
        let validation = this.state.validation;

        if (validation[name].valid) {
            className = '';
        } else if (!validation[name].valid && validation[name].dirty) {
            className = 'invalid';
        } else if (!validation[name].valid && !validation[name].dirty) {
            className = '';
        }

        return className;
    }

    /**
     * Handle Submit Event
     *
     * @param event - DOM event info
     * @state - Send validation status to state and make scan request
     */
    handleSubmit(event) {
    	let { name, email, message } = this.state;
        event.preventDefault();

        if (this.validateInputs()) {
            this.props.postForm({ name, email, message });
        } else {
            // create a shallow copy of the state to mutate
            let obj = Object.assign({}, this.state);
            // If there is an invalid input, mark all as dirty on submit to alert the user
            for (let attr in this.state) {
                if (obj['validation'][attr]) {
                    obj['validation'][attr]['dirty'] = true;
                }
            }

            this.setState(obj);
        }
    }

	render() {
		return (
			<div>
				<NavBar />
				<div className="portfolio">

					<div className="clearfix" />

					<form>
						<h4> Contact Me </h4>
						<div className="form__row">
							<div className="form__item">
								<label className={this.handleErrorClass('name')}>Your Name</label>
								<input type="text" name="name" maxLength="100" onChange={this.onChange} className={this.handleErrorClass('name')} />
								<div className={this.handleErrorClass('name')}>required*</div>
							</div>
							<div className="form__item">
								<label className={this.handleErrorClass('email')}>Email Address</label>
								<input type="text" name="email" maxLength="254" onChange={this.onChange} className={this.handleErrorClass('email')} />
								<div className={this.handleErrorClass('email')}>invalid*</div>
							</div>
						</div>
						<div className="form__row">
							<div className="form__item-lg">
								<label className={this.handleErrorClass('message')}>Your Message</label>
								<textarea maxLength="6000" name="message" onChange={this.onChange} className={this.handleErrorClass('message')} />
								<div className={this.handleErrorClass('message')}>required*</div>
							</div>
						</div>

						<button onClick={this.handleSubmit} className="form-button">
		                    <span className="form-button__text">Send</span>
		                </button>

					</form>

					{this.renderLoading()}

				</div>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);