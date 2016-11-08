
import React from 'react';

import style from 'cloudgov-style/css/cloudgov-style.css';

import createStyler from '../util/create_styler';

const propTypes = {
  columns: React.PropTypes.number
};
const defaultProps = {
  columns: 12
};

export default class PanelGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styler = createStyler(style);
  }

  render() {
    const gridClass = `grid-width-${this.props.columns}`;
    return (
      <div className={ this.styler('panel-group', gridClass) }>
        { this.props.children }
      </div>
    );
  }
}

PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;
