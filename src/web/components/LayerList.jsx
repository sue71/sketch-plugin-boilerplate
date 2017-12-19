import * as React from 'react';
import { Table } from 'antd';

import call from 'sketch-module-web-view/client';

/// LayerList
export class LayerList extends React.Component {

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Color',
        dateIndex: 'color',
        key: 'color',
        render: (text, record) => {
          return <div style={{backgroundColor: record.color, width: 16, height: 16}}></div>
        }
      },
      {
        title: 'Type',
        dataIndex: 'class',
        key: 'class'
      },
      {
        title: 'Text',
        dataIndex: 'value',
        key: 'value'
      }
    ];
    return (
      <div className='LayerList' style={this.styles.container} >
        <Table
          onRowClick={this.onSelect}
          columns={columns}
          dataSource={this.props.layers}
          pagination={false}
        />
      </div>
    );
  }

  onSelect(record, index, e) {
    call('didSelectLayer', record.objectid);
  }

  get styles() {
    return {
      container: {
        height: `calc(100vh - 50px)`,
        overflow: 'scroll'
      },
      row: {
        display: 'flex'
      },
      cell: {
        padding: '2px 4px'
      }
    };
  }

}
