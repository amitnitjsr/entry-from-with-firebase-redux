import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from '../store/Action';
import AddEdit from '../components/addEditComponent';

import ListData from '../components/listTable';
import fireBaseDB from '../../firebase';

class EntryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {},
            currentID: ''
        }
    }

    componentDidMount() {
        fireBaseDB.child('entry').on('value', snapshot => {
            if (snapshot.val() != null) {
                this.setState({ list: snapshot.val() }, () => {
                    this.props.updateRedux(this.state.list);
                });
            }
            else {
                this.setState({ list: {} });
            }
        })
    }

    addOrEdit = (obj) => {
        if (this.state.currentID === '') {
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
            fireBaseDB.child(`entry/${this.state.currentID}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        this.setState({ currentID: '' });
                    }
                }
            )
        }
    }

    editHander = (id) => {
        console.log('id', id)
        this.setState({ currentID: id });
    }

    deleteHandler = (id) => {
        if (window.confirm('Are you sure wants to delete records')) {
            fireBaseDB.child(`entry/${id}`).remove(
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    }

    render() {
        return (
            <div>
                <AddEdit
                    list={this.state.list}
                    id={this.state.currentID}
                    addOrEdit={this.addOrEdit}
                />
                <ListData
                    list={this.state.list}
                    editHander={this.editHander}
                    deleteHandler={this.deleteHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.entry.list,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...action
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryComponent);

// export default EntryComponent;