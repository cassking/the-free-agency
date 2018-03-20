import React, { Component } from 'react'
import CommentForm from '../components/CommentForm';

class CommentFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      errors: {}
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateSignedIn(signed_in) {
    if (signed_in === false) {
      let newError = { SignIn: 'User must be signed in.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.SignIn
      this.setState({ errors: errorState })
      return true
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (
      this.validateSignedIn(this.props.signed_in) && this.validateBodyChange(this.state.comment)
    ) {
      let payload = {
        comment: {
          body: this.state.comment
        }
      }
      this.props.addNewComment(payload)
      this.setState({
        comment: ''
      })
    }
  }

  handleChange(e) {
    this.setState({ comment: e.target.value })
  }

  validateBodyChange(body) {
    if (body.trim() === '') {
      let newError = { Body: 'Body may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.Body
      this.setState({ errors: errorState })
      return true
    }
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    let commentForm;
    if (this.props.signed_in) {
      commentForm = <CommentForm
                      comment={this.state.comment}
                      handleFormSubmit={this.handleFormSubmit}
                      handleChange={this.handleChange}
                    />
    }
    else {
      commentForm = <p>Sign in to comment</p>
    }
    return (
      <div>
        {errorDiv}
        {commentForm}
      </div>
    )
  }
}

export default CommentFormContainer;
