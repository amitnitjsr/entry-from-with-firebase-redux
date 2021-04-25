import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as action from '../Action';
import Navbar from '../../../Component/Navbar/Navbar';
import fireBaseDB from '../../../firebase';
import AddEditComponent from '../Add/index';
import './Table.css';

const TableComponent = (props) => {

    const [entryObject, setentryObject] = useState({});
    const [currentID, setCurrectID] = useState('');

    useEffect(() => {
        fireBaseDB.child('entry').on('value', snapshot => {
            if (snapshot.val() != null) {
                setentryObject({
                    ...snapshot.val()
                })
            }
            else {
                setentryObject({});
            }
        })
    }, []);

    useEffect(() => {
        console.log('entryObject', entryObject)
    }, [entryObject]);

    const editHander = (id) => {
        setCurrectID(id);
        props.history.push(
            '/customer/edit/' + id + '/'
        )
    }

    const deleteHandler = (id) => {

    }

    const { list } = props;

    return (
        <div>
            <Navbar />
            <AddEditComponent listObject={entryObject} id={currentID} />
            <div style={{ padding: '5%' }}>
                <Button style={{
                    left: ' 2%',
                    position: 'relative'
                }}
                    onClick={() =>
                        props.history.push(
                            '/customer/new'
                        )}
                >
                    <i className="zmdi zmdi-account-add zmdi-hc-lg"></i>&nbsp;
                    Add Customer
                </Button>

                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr no</TableCell>
                                <TableCell align="left">Dates of Services</TableCell>
                                <TableCell align="left">Procedure Code</TableCell>
                                <TableCell align="left">Qty</TableCell>
                                <TableCell align="left">Diag.Pointers</TableCell>
                                <TableCell align="left">Modifiers</TableCell>
                                <TableCell align="left">Bill Amount</TableCell>
                                <TableCell align="left">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(entryObject).map((id, index) => (
                                <TableRow key={id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].start_of_services},
                                        {entryObject[id].end_of_services}
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].procedure_code},
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].quantity}
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].dp1},
                                        {entryObject[id].dp2}
                                        {entryObject[id].dp3}
                                        {entryObject[id].dp4}
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].md1},
                                        {entryObject[id].md2}
                                        {entryObject[id].md3}
                                        {entryObject[id].md4}
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].bill_amount}
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="action">
                                            <IconButton
                                                onClick={() => editHander(id)}
                                            >
                                                <i className="zmdi zmdi-edit zmdi-hc-fnewstatusw table-icon" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => deleteHandler(id)}
                                            >
                                                <i className="zmdi zmdi-delete zmdi-hc-fw table-icon" />
                                            </IconButton>
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/* <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tax</TableCell>
                                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* <ReactTable
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
                                            onClick={() => editHander(row.row._original.id)}
                                        >
                                            <i className="zmdi zmdi-edit zmdi-hc-fnewstatusw table-icon" />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => props.deleteCustomer({ 'id': row.row._original.id })}
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
                /> */}
            </div >
        </div>
    );

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableComponent))