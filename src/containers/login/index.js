import React from 'react';

import { get } from 'services/login';

const Login = () => {
  const onClick = () => {
    get({ account: '15726940632', password: '1019' });
  };
  return (
    <div>
      <button onClick={onClick}>login</button>
    </div>
  );
};

export default Login;
