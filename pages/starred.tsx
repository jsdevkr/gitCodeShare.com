import * as React from 'react';
import { SLayout } from '../styledComponents';
import { IAppStore } from '../stores/AppStore';
import { inject, observer } from 'mobx-react';

interface IProps {
  appStore?: IAppStore;
  list: [];
}

@inject('appStore')
@observer
class Starred extends React.Component<IProps> {
  componentDidMount() {
    const { appStore } = this.props;
    const { starredList } = appStore;
    if (!starredList.length) {
      appStore.getStarredGists();
    }
  }
  render() {
    const { appStore } = this.props;
    const { starredList } = appStore;

    return (
      <SLayout>
        <h1 style={{ color: 'white' }}>gitCodeShare</h1>
        {starredList.map((gist, i: number) => {
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
