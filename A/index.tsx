/**
 * A link to a certain page, an anchor tag
 */

import * as React from 'react';
import {omit} from 'lodash';
const {createStyleSheet} = require('jss-theme-reactor');
import {Action, ActionCreator, bindActionCreators} from 'redux';
const {connect} = require('react-redux');
import {push, PushAction} from 'react-router-redux';
const autoBind = require('react-autobind');
const cx = require('classnames');

export interface IAProps extends React.ClassAttributes<A> {
  href?: any;
  push?: PushAction;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  title?: string;
  footer?: boolean;
  linkClass?: string;
  disabled?: boolean;
}

export const styleSheet = createStyleSheet('A', () => {
  return {
    root: {
      display: 'inline-block',
      textAlign: 'center',
      textDecoration: 'none',
      color: '#00C5C1',
      verticalAlign: 'middle',
      cursor: 'pointer',
      '&:hover': {
        fontWeight: 700,
      },
      '&:active': {
        color: '#107976',
        fontWeight: '400',
      },
      '&::after': {
        display: 'block',
        content: 'attr(title)',
        fontWeight: 'bold',
        height: '1px',
        color: 'transparent',
        overflow: 'hidden',
        visibility: 'hidden',
      },
    },
    footer: {
      composes: '$root',
      color: 'rgba(117, 117, 117, 0.6)',
      '&:active': {
        color: '#757575',
      },
    },
    disabled: {
      composes: '$root',
      pointerEvents: 'none',
      cursor: 'default',
      '&:hover': {
        fontWeight: 400,
      },
    },
  };
});

export class A extends React.Component<IAProps, {}> {
  static contextTypes = {
    styleManager: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    footer: false,
    disabled: false,
  };

  constructor(props: IAProps, context: any) {
    super(props, context);

    autoBind(this);
  }

  handleClick(event: React.SyntheticEvent<any>) {
    event.preventDefault();
    this.props.push(this.props.href);
  }

  render() {
    const {className, children, href, target, footer, disabled} = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const other = omit(this.props, ['className', 'children', 'href', 'target', 'push', 'footer', 'linkClass']);

    const rootClasses = {
      [`${classes.root}`]: true,
      [`${classes.footer}`]: footer,
      [`${classes.disabled}`]: disabled,
    };

    return (
      <a
        href={href}
        onClick={this.handleClick}
        target={target}
        className={this.props.linkClass || cx(rootClasses)}
        {...other}
      >
        { children }
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  push,
}, dispatch);

export default connect(null, mapDispatchToProps)(A);
