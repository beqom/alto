import React from 'react';

const fixAddonInfo = story => {
  class AddonInfoFix extends React.Component {
    componentDidMount() {
      this.fixInfoPanel();
    }

    fixInfoPanel() {
      const infoDomNode = ((this.domNode || {}).firstChild || {}).lastChild;
      if (infoDomNode) {
        infoDomNode.className += 'markdown-body';
        infoDomNode.querySelectorAll('table').forEach(tableDomNode => {
          tableDomNode.style = '';
        });
      }
    }

    render() {
      return <div ref={node => (this.domNode = node)}>{story()}</div>;
    }
  }
  return <AddonInfoFix />;
};

export default fixAddonInfo;
