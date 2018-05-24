/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { updateRouterState, loadUserPage, loadMoreStarred } from 'actions/real';
import User from 'components/real/User';
import Repo from 'components/real/Repo';
import List from 'components/real/List';
import lodash from 'lodash';

class UserPage extends Component {
  constructor (props) {
    super(props);
    this.renderRepo = this.renderRepo.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentDidMount () {
    let { url, params } = this.props.match;
    this.props.updateRouterState({
      params,
      pathname: url,
    });
  }

  componentWillReceiveProps (nextProps) {
    let { url, params } = nextProps.match;
    if (this.props.match.url !== url) {
      this.props.updateRouterState({
        params,
        pathname: url,
      });
    }
  }

  handleLoadMoreClick () {
    this.props.loadMoreStarred(this.props.login);
  }

  renderRepo ([repo, owner], index) {
    return (
      <Repo repo={repo}
        owner={owner}
        key={`${repo.fullName}${index}`}
      />
    );
  }

  render () {
    const { user, login, match } = this.props;

    if (!user) {
      return <h1><i>Loading {login}’s profile...</i></h1>;
    }

    const { starredRepos, starredRepoOwners, starredPagination } = this.props;

    return (
      <div>
        <User user={user} />
        <hr />
        <List renderItem={this.renderRepo}
          items={lodash.zip(starredRepos, starredRepoOwners)}
          onLoadMoreClick={this.handleLoadMoreClick}
          loadingLabel={`Loading ${login}’s starred...`}
          {...starredPagination}
        />
        <Route path={`${match.url}/:login`} exact component={UserPage} />
      </div>
    );
  }
}

UserPage.propTypes = {
  login: PropTypes.string,
  user: PropTypes.object,
  starredPagination: PropTypes.object,
  starredRepos: PropTypes.array.isRequired,
  starredRepoOwners: PropTypes.array.isRequired,
  loadUserPage: PropTypes.func.isRequired,
  loadMoreStarred: PropTypes.func.isRequired,
  updateRouterState: PropTypes.func.isRequired,
  match: PropTypes.object,
};

function mapStateToProps (state) {
  const { login } = state.real.router.params;
  const {
    pagination: { starredByUser },
    entities: { users, repos },
  } = state.real;

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map(id => repos[id]);
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner]);

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login],
  };
}

export default connect(mapStateToProps, {
  loadUserPage,
  loadMoreStarred,
  updateRouterState,
})(UserPage);
