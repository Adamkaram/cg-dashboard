
import React from 'react';
import Reactable from 'reactable';

var Table = Reactable.Table,
    unsafe = Reactable.unsafe;

function stateSetter(props) {
  return {
    apps: props.initialApps,
    currentOrgGuid: props.initialOrgGuid,
    currentSpaceGuid: props.initialSpaceGuid
  }
}

export default class AppList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = stateSetter(props);;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(stateSetter(nextProps));
  }

  appUrl(app) {
    return `/#/org/${ this.state.currentOrgGuid }
      /spaces/${ this.state.currentSpaceGuid }
      /apps/${ app.guid }`;
  }

  getRows(apps) {
    var rows = [];
    for (let app of apps) {
      let row = app;
      row.name = unsafe(`<a href="${ this.appUrl(app) }">${ app.name }</a>`);
      rows.push(row);
    }
    return rows;
  }

  get columns() {
    return [
      { label: 'Name', key: 'name' },
      { label: 'Buildpack', key: 'buildpack' },
      { label: 'Memory', key: 'memory' },
      { label: 'Instances', key: 'instances' },
      { label: 'State', key: 'state' },
      { label: 'Disk quota', key: 'disk_quota' }
    ];
  }

  render() {
    var content = <h4 className="test-none_message">No apps</h4>;
    // TODO format rows in table
    if (this.state.apps.length) {
      content = <Table data={ this.getRows(this.state.apps) } 
        columns={ this.columns }
        sortable={ true } className="table" />;
    }

    return (
      <div className="tableWrapper"> 
        { content }
      </div>
    );
  }
};

AppList.propTypes = {
  initialApps: React.PropTypes.array,
  initialOrgGuid: React.PropTypes.string.isRequired,
  initialSpaceGuid: React.PropTypes.string.isRequired
};

AppList.defaultProps = {
  initialApps: []
}
