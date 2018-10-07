import * as React from 'react';
import { ApiProvider } from '../providers';
import { IGist } from '../model/gist';
import { SLayout } from '../styledComponents';

interface IProps {
  list: [];
}

class Starred extends React.Component<IProps> {
  state = { list: [] };

  componentDidMount() {
    this.getStarred();
  }

  async getStarred() {
    try {
      const list = await ApiProvider.GistRequest.getStarredGists();
      this.setState({ list });
    } catch (err) {
      this.setState({ list: [] });
      console.log(JSON.stringify(err));
    }
  }

  render() {
    const { list } = this.state;
    console.log(list);
    return (
      <SLayout>
        <h1 style={{ color: 'white' }}>gitCodeShare</h1>
        {list.map((gist: IGist, i: number) => {
          return (
            <p key={i} style={{ color: 'white' }}>
              {gist.url}
            </p>
          );
        })}
      </SLayout>
    );
  }
}

export default Starred;
