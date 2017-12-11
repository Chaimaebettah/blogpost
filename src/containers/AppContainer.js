import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import App from '../components/App';

import {addPosts, editPost} from '../helpers/request';

import {getInitialData} from "../actions/index";


import '../styles/App.css';

class AppContainer extends Component {
  state = {
    values: '',
    comment: ''
  };

  componentWillMount() {
    this.props.dispatch(getInitialData());
  }

  setFormValues = (values) => {
    this.setState({values: values});
    const nextValues = {...values};

    // if there is already an id in the form values, we need to call the editPost request helper
    if (values.id) {
      editPost(values, values.id);
      return false;
    }

    nextValues.id = Math.floor(Math.random() * 200000);
    nextValues.timestamp = Date.now();
    nextValues.image = values.image.file.thumbUrl;
    addPosts(nextValues)
  };

  render() {
    return (
      <App
        categories={this.props.categories}
        values={this.state.values}
        setFormValues={this.setFormValues}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default withRouter(connect(mapStateToProps)(AppContainer));
