import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Button from '../Button';
import { bemClass } from '../helpers/bem';
import './ShowMore.scss';

class ShowMore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
    };

    this.toggle = this.toggle.bind(this);
    this.setContentNode = this.setContentNode.bind(this);
  }

  setContentNode(node) {
    this.contentNode = node;
  }

  getContentHeight() {
    if (this.state.open && this.contentNode) {
      return this.contentNode.clientHeight;
    }

    return 0;
  }

  toggle() {
    this.setState(({ open }) => ({ open: !open }));
  }

  render() {
    const { children, className, labelToOpen, labelToClose } = this.props;
    const { open } = this.state;
    return (
      <div className={classnames('ShowMore', className)}>
        <div
          className={bemClass('ShowMore__content-wrapper', { open })}
          style={{ height: this.getContentHeight() }}
        >
          <div className="ShowMore__content" ref={this.setContentNode}>
            {children}
          </div>
        </div>

        <Button flat block onClick={this.toggle}>
          {open ? labelToClose : labelToOpen}
        </Button>
      </div>
    );
  }
}

ShowMore.displayName = 'ShowMore';

ShowMore.defaultProps = {
  open: false,
};

ShowMore.propTypes = {
  labelToOpen: PropTypes.string.isRequired,
  labelToClose: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  open: PropTypes.bool,
};

export default ShowMore;
