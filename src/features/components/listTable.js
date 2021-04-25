import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TableComponent = (props) => {

    const [entryObject, setentryObject] = useState({});

    useEffect(() => {
        if (props.list) {
            setentryObject(props.list);
        }
    }, [props.list]);

    const total = () => {
        let totalAmt = 0;
        Object.keys(entryObject).map((id) => (
            totalAmt = totalAmt + (+entryObject[id].bill_amount)
        ))
        return totalAmt;
    }

    return (
        <div>
            <div style={{ padding: '5%' }}>

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
                                <TableCell align="center">Action</TableCell>
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
                                        {entryObject[id].procedure_code}
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].quantity}
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].dp1 !== '' ? entryObject[id].dp1 : ''}
                                        {entryObject[id].dp2 !== '' ? ',' + entryObject[id].dp2 : ''}
                                        {entryObject[id].dp3 !== '' ? ',' + entryObject[id].dp3 : ''}
                                        {entryObject[id].dp4 !== '' ? ',' + entryObject[id].dp4 : ''}
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].md1 !== '' ? entryObject[id].md1 : ''}
                                        {entryObject[id].md2 !== '' ? ',' + entryObject[id].md2 : ''}
                                        {entryObject[id].md3 !== '' ? ',' + entryObject[id].md3 : ''}
                                        {entryObject[id].md4 !== '' ? ',' + entryObject[id].dp4 : ''}
                                    </TableCell>
                                    <TableCell align="left">
                                        {entryObject[id].bill_amount}
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="action">
                                            <IconButton
                                                onClick={() => props.editHander(id)}
                                            >
                                                <i className="zmdi zmdi-edit zmdi-hc-fnewstatusw table-icon" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => props.deleteHandler(id)}
                                            >
                                                <i className="zmdi zmdi-delete zmdi-hc-fw table-icon" />
                                            </IconButton>
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow >
                                <TableCell colSpan={6}>Total</TableCell>
                                <TableCell align="left">
                                    {total()}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div >
        </div>
    );

}



export default TableComponent;