/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { loadRepoPage, loadMoreStargazers, updateRouterState } from 'actions/real';
import Repo from 'components/real//Repo';
import User from 'components/real/User';
import List from 'components/real/List';


class RepoPage extends Component {
  constructor (props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount () {
    let { url, params } = this.props.match;
    this.props.updateRouterState({
      params,
      pathname: url,
    });
  }

  componentWillReceiveProps (nextProps) {
    // if (nextProps.fullName !== this.props.fullName) {
    //   this.props.loadRepoPage(nextProps.fullName);
    // }
    let { url, params } = nextProps.match;
    if (this.props.match.fullName !== url) {
      this.props.updateRouterState({
        params,
        pathname: url,
      });
    }
  }

  handleLoadMoreClick () {
    console.log('load more', this.props.loadMoreStargazers);
    this.props.loadMoreStargazers(this.props.fullName);
  }

  renderUser (user) {
    return (
      <User user={user}
        key={user.login}
      />
    );
  }

  render () {
    const {
      repo, owner, name, match,
    } = this.props;
    if (!repo || !owner) {
      return <h1><i>Loading {name} details...</i></h1>;
    }

    console.log('repo', match);

    const { stargazers, stargazersPagination } = this.props;
    return (
      <div>
        <Repo repo={repo}
          owner={owner}
        />
        <hr />
        <List renderItem={this.renderUser}
          items={stargazers}
          onLoadMoreClick={this.handleLoadMoreClick}
          loadingLabel={`Loading stargazers of ${name}...`}
          {...stargazersPagination}
        />
        <Route path={`${match.url}/:name`} exact component={RepoPage} />
      </div>
    );
  }
}

RepoPage.propTypes = {
  repo: PropTypes.object,
  fullName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.object,
  stargazers: PropTypes.array.isRequired,
  stargazersPagination: PropTypes.object,
  loadRepoPage: PropTypes.func.isRequired,
  loadMoreStargazers: PropTypes.func.isRequired,
  match: PropTypes.object,
  updateRouterState: PropTypes.func.isRequired,
};

function mapStateToProps (state) {
  const { login, name } = state.real.router.params;
  const {
    pagination: { stargazersByRepo },
    entities: { users, repos },
  } = state.real;

  const fullName = `${login}/${name}`;
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] };
  const stargazers = stargazersPagination.ids.map(id => users[id]);

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login],
  };
}

export default connect(mapStateToProps, {
  loadRepoPage,
  loadMoreStargazers,
  updateRouterState,
})(RepoPage);
