import * as React from 'react';
import { styled, RoundedButton } from '../styledComponents';
import axios from 'axios';

interface IProps {}

const Component = styled.div`
  margin: 50px;

  [data-title] {
    font-size: 20px;
    color: ${props => props.theme.primaryColor};
  }
  [data-item] {
    border: 1px solid ${props => props.theme.primaryColor};
  }
`;

class Sample extends React.Component<IProps> {
  postGists = async () => {
    const gist: any = {
      description: 'Hello World Examples',
      public: true,
      files: {
        'hello_world_ruby.txt': {
          content: 'Run `ruby hello_world.rb` to print Hello World',
        },
        'hello_world_python.txt': {
          content: 'Run `python hello_world.py` to print Hello World',
        },
      },
    };

    const { data } = await axios('/gists', {
      method: 'POST',
      data: gist,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    console.log(data);
  };

  getGists = async () => {
    const { data } = await axios('/gists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    console.log(data);
  };

  login = () => {
    location.href = '/auth/github';
  };

  logout = () => {
    location.href = '/logout';
  };

  render() {
    return (
      <Component>
        <div data-title>I am Title</div>

        <RoundedButton onClick={this.postGists}>Post</RoundedButton>
        <RoundedButton onClick={this.getGists}>List</RoundedButton>
        <RoundedButton onClick={this.login}>Login with Github</RoundedButton>
        <RoundedButton onClick={this.logout}>Logout</RoundedButton>
      </Component>
    );
  }
}

export default Sample;
