import React from 'react';
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as action from '../Action';
import Navbar from '../../../Component/Navbar/Navbar';
import './Table.css';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { list } = this.props;
        return (
            <div>
                <Navbar />
                <div style={{ padding: '5%' }}>
                    <Button style={{
                        left: ' 2%',
                        position: 'relative'
                    }}
                        onClick={() =>
                            this.props.history.push(
                                '/customer/new'
                            )}
                    >
                        <i className="zmdi zmdi-account-add zmdi-hc-lg"></i>&nbsp;
                    Add Customer
                </Button>

                    <ReactTable
                        data={list ? list : []}
                        columns={[
                            {
                                Header: () => <div className="ID">S. No.</div>,
                                accessor: 'id',
                                className: 'text-center',
                                sortable: false,
                                filterable: false,
                                foldable: true,
                                width: 75
                            },
                            {
                                Header: () => <div className="Header" >Name</div>,
                                accessor: 'name',
                                className: 'text-center',
                                foldable: true
                            },
                            {
                                Header: () => <div className="Header" >Email</div>,
                                accessor: 'email',
                                foldable: true,
                                className: 'text-center',
                            },
                            {
                                Header: () => <div className="Header" >Phone</div>,
                                accessor: 'phone',
                                foldable: true,
                                className: 'text-center',
                            },
                            {
                                Header: () => <div className="Header" >Action</div>,
                                sortable: false,
                                filterable: false,
                                className: 'Action',
                                id: 'button',
                                width: 150,
                                Cell: (row) => {
                                    return (
                                        <span className="action">
                                            <IconButton
                                                onClick={() =>
                                                    this.props.history.push(
                                                        '/customer/edit/' + row.row._original.id + '/'
                                                    )}
                                            >
                                                <i className="zmdi zmdi-edit zmdi-hc-fnewstatusw table-icon" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => this.props.deleteCustomer({ 'id': row.row._original.id })}
                                            >
                                                <i className="zmdi zmdi-delete zmdi-hc-fw table-icon" />
                                            </IconButton>
                                        </span>
                                    );
                                }
                            },
                        ]}
                        pageSize={list.length}
                        showPaginationBottom={false}
                    />
                </div >
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.customer.customerDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...action
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table))