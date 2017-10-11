
import style from 'cloudgov-style/css/cloudgov-style.css';
import PropTypes from 'prop-types';
import React from 'react';
import { I18n } from 'react-i18next';

import createStyler from '../util/create_styler';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

export default class InfoStructure extends React.Component {
  constructor(props) {
    super(props);
    this.styler = createStyler(style);
  }

  render() {
    return (
      <section className={ this.props.className }>
        <h4>Basic cloud.gov structure</h4>
        <ul>
          <li>
            <I18n>{t => <strong>{t('Organization')}:</strong>}</I18n> Each org is a{' '}
            <a href="https://cloud.gov/overview/terminology/pricing-terminology/#system">system</a> (<a href="https://cloud.gov/docs/getting-started/concepts/#organizations">shared perimeter</a>) that contains <a href="https://cloud.gov/overview/pricing/system-stuffing/">related spaces holding related applications</a>.
          </li>
          <li><strong>Spaces:</strong> Within an org, your <a href="https://cloud.gov/docs/getting-started/concepts/#spaces">spaces</a> provide environments for applications (<a href="https://cloud.gov/overview/overview/using-cloudgov-paas/">example use</a>).
          </li>
          <li><strong>Marketplace:</strong> Use your org’s <a href="https://cloud.gov/docs/apps/managed-services/">marketplace</a> to create <a href="https://cloud.gov/docs/services/">service</a> instances for spaces in that org.
          </li>
        </ul>
      </section>
    );
  }
}

InfoStructure.propTypes = propTypes;

InfoStructure.defaultProps = defaultProps;
