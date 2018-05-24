
export const getUser = (state, login) => state.real.entities.users[login];
export const getRepo = (state, fullName) => state.real.entities.repos[fullName];
export const getStarredByUser = (state, login) => state.real.pagination.starredByUser[login] || {};
export const getStargazersByRepo = (state, fullName) => state.real.pagination.stargazersByRepo[fullName] || {};
export const getRouterParams = state => state.real.router.params;
