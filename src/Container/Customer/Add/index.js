import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from '../Action';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Row, Col, Button } from 'reactstrap';
import Navbar from '../../../Component/Navbar/Navbar';
// import ContactsForm from './ContactsForm';
import fireBaseDB from '../../../firebase';
import './AddEdit.css';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        boxShadow: "0px 0px 1px 1px lightgrey"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const AddEdit = (props) => {

    const classes = useStyles();
    const initialFieldsValue = {
        start_of_services: '',
        end_of_services: '',
        procedure_code: '',
        quantity: 0,
        place_of_services: '',
        dp1: '',
        dp2: '',
        dp3: "",
        dp4: '',
        md1: '',
        md2: '',
        md3: '',
        md4: '',
        ndc_code: '',
        ndc_quantity: 0,
        bill_amount: 0,
        provider_email_address: '',
        provider_phone: ''
    }
    const [values, setValues] = useState(initialFieldsValue);
    const [currentID, setCurrentID] = useState('');


    const addOrEdit = (obj) => {
        if (currentID == '') {
            fireBaseDB.child('entry').push(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
        else {
            fireBaseDB.child(`entry/${currentID}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setCurrentID('');
                    }
                }
            )
        }
        props.history.push('/customer');
    }

    const onDelete = (id) => {
        if (window.confirm('Are you sure wants to delete records')) {
            fireBaseDB.child(`contacts/${id}`).remove(
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    }

    useEffect(() => {
        // const { id } = props.match.params;
        const { id } = props;
        const { list } = props;
        console.log(id, list)
        if (id) {
            setCurrentID(id);
            const finalList = list.filter(d => d.id === parseInt(id));
            setValues({ ...props.listObject[id] });
        }
        else {
            setCurrentID('');
        }
    }, [props.id, props]);
    // console.log('values', values)
    const saveHandler = () => {
        if (props.match.params.id) {
            // props.editCustomer({ "id": parseInt(props.match.params.id), "name": name, "customer_id": custId, "phone": phone, "gender": gender, "email": email });
            props.history.push('/customer');
        }
        else {
            // props.addNewCustomer({ "name": name, "customer_id": custId, "phone": phone, "gender": gender, "email": email });
            props.history.push('/customer');
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('values', values)
        addOrEdit(values);
        // props.addOrEdit(values);
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    return (
        <div>
            <Navbar />
            <Container component="main" maxWidth="xl" style={{ padding: '1%' }}>
                <div className={classes.paper}>
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <Row>
                            <Col>
                                <TextField
                                    name="start_of_services"
                                    value={values.start_of_services}
                                    label="Start of Services"
                                    type="date"
                                    className={classes.textField}
                                    onChange={handleChangeInput}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Col>
                            <Col>
                                <TextField
                                    name="end_of_services"
                                    value={values.end_of_services}
                                    label="End of Services"
                                    type="date"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Col>
                            <Col>
                                <TextField
                                    name="procedure_code"
                                    value={values.procedure_code}
                                    label="Procedure Code"
                                    type="text"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Col>
                            <Col>
                                <TextField
                                    name="quantity"
                                    value={values.quantity}
                                    label="Quantity"
                                    type="number"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <TextField
                                    name="place_of_services"
                                    value={values.place_of_services}
                                    label="Place of Services"
                                    type="text"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Col>
                            <Col style={{ display: 'flex' }}>
                                <label>Diagnosis Pointers</label>
                                <TextField
                                    name="dp1"
                                    value={values.dp1}
                                    type="text"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    label="DP1"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '15%' }}
                                    required
                                /> &nbsp;
                                <TextField
                                    name="dp2"
                                    value={values.dp2}
                                    type="text"
                                    label="DP2"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '15%' }}
                                />&nbsp;
                                <TextField
                                    name="dp3"
                                    value={values.dp3}
                                    type="text"
                                    label="DP3"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '15%' }}
                                />&nbsp;
                                <TextField
                                    name="dp4"
                                    value={values.dp4}
                                    type="text"
                                    label="DP4"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '15%' }}
                                />
                            </Col>
                            <Col>
                                <label>Modifiers</label>&nbsp;
                                <TextField
                                    name="md1"
                                    value={values.md1}
                                    type="text"
                                    className={classes.textField}
                                    label="MD1"
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '15%' }}
                                />&nbsp;
                                <TextField
                                    name="md2"
                                    value={values.md2}
                                    type="text"
                                    className={classes.textField}
                                    variant="outlined"
                                    label="MD2"
                                    onChange={handleChangeInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '15%' }}
                                />&nbsp;
                                <TextField
                                    name="md3"
                                    value={values.md3}
                                    type="text"
                                    label="MD3"
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '15%' }}
                                />&nbsp;
                                <TextField
                                    name="md4"
                                    value={values.md4}
                                    type="text"
                                    label="MD4"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '15%' }}
                                />&nbsp;
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <TextField
                                    name="ndc_code"
                                    value={values.ndc_code}
                                    label="NDC Code"
                                    type="text"
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                            <Col>
                                <TextField
                                    name="ndc_quantity"
                                    value={values.ndc_quantity}
                                    label="NDC Quantity"
                                    type="number"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                            <Col>
                                <TextField
                                    name="bill_amount"
                                    value={values.bill_amount}
                                    label="Bill Amount"
                                    onChange={handleChangeInput}
                                    type="number"
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <TextField
                                    name="provider_email_address"
                                    value={values.provider_email_address}
                                    label="Provider email Address"
                                    type="email"
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Col>
                            <Col>
                                <TextField
                                    name="provider_phone"
                                    value={values.provider_phone}
                                    label="Provider phone"
                                    type="text"
                                    onChange={handleChangeInput}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <div className="col-auto mr-auto"></div>
                            <div className="float-right add-pos">
                                <button className="add">
                                    Add
                                </button>
                            </div>
                        </Row>
                    </form>
                </div>
            </Container>
        </div>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
